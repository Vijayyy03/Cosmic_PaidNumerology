
$ServerIP = "194.238.19.46"
$User = "root"

Write-Output "Starting Deployment to $ServerIP..."

# 1. Frontend Deployment
Write-Output "Uploading Frontend..."
if (!(Test-Path "frontend/dist")) {
    Write-Output "Error: frontend/dist not found. Run 'npm run build' in frontend folder first."
    exit 1
}
scp -r "frontend/dist/*" "${User}@${ServerIP}:/var/www/numerology_frontend/"

# 2. Backend Deployment
Write-Output "Uploading Backend..."
scp -r "backend/app/*" "${User}@${ServerIP}:/var/www/cosmic_backend/app/"
scp "backend/requirements.txt" "${User}@${ServerIP}:/var/www/cosmic_backend/"
scp "backend/main.py" "${User}@${ServerIP}:/var/www/cosmic_backend/"
scp -r "deployment" "${User}@${ServerIP}:/var/www/cosmic_backend/"

Write-Output "Files Uploaded!"
Write-Output "Now SSH into the server and run:"
Write-Output "   ssh ${User}@${ServerIP}"
Write-Output "   sudo supervisorctl restart cosmic"
