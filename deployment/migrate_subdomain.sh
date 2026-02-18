#!/bin/bash
set -e

echo "Starting Migration to Subdomain..."

# 1. Create new directory for the app
mkdir -p /var/www/numerology_frontend
echo "Created /var/www/numerology_frontend"

# 2. Setup Nginx Config
cp /root/deployment/numerology_conf /etc/nginx/sites-available/numerology
ln -sf /etc/nginx/sites-available/numerology /etc/nginx/sites-enabled/

# 3. Disable the 'frontend' config (which took over shivcosmic.com)
rm -f /etc/nginx/sites-enabled/frontend
echo "Disabled 'frontend' config (shivcosmic.com restored to default/old)"

# 4. Restart Nginx
nginx -t
systemctl restart nginx

echo "✅ Migration Logic Complete."
echo "NEXT STEPS:"
echo "1. Upload your 'dist' folder to /var/www/numerology_frontend"
echo "2. Run certbot for numerology.shivcosmic.com"
