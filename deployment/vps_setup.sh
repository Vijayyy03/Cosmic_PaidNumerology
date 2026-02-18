#!/bin/bash
set -e

# 1. Update & Install Dependencies
echo "Updated System..."
apt-get update
apt-get install -y nginx python3-pip python3-venv supervisor certbot python3-certbot-nginx

# 2. Setup Backend
echo "Setting up Backend..."
mkdir -p /var/www/cosmic_backend
cd /var/www/cosmic_backend

# Create venv if not exists
if [ ! -d "venv" ]; then
    python3 -m venv venv
fi

source venv/bin/activate
pip install -r requirements.txt

# 3. Setup Environment Variables
# We assume .env.production was uploaded to the correct place, we just rename it to .env
if [ -f "/var/www/cosmic_backend/.env.production" ]; then
    cp /var/www/cosmic_backend/.env.production /var/www/cosmic_backend/.env
    echo "Environment file configured."
fi

# 4. Configure Supervisor
echo "Configuring Supervisor..."
cp /root/deployment/cosmic.conf /etc/supervisor/conf.d/cosmic.conf
supervisorctl reread
supervisorctl update
supervisorctl restart cosmic

# 5. Configure Nginx
echo "Configuring Nginx..."
rm -f /etc/nginx/sites-enabled/default
cp /root/deployment/frontend_conf /etc/nginx/sites-available/frontend
cp /root/deployment/backend_conf /etc/nginx/sites-available/backend

ln -sf /etc/nginx/sites-available/frontend /etc/nginx/sites-enabled/
ln -sf /etc/nginx/sites-available/backend /etc/nginx/sites-enabled/

nginx -t
systemctl restart nginx

echo "✅ Setup Complete. Please run 'certbot --nginx' manually to enable HTTPS."
