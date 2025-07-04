
export const config = {
   auth0Domain : String(import.meta.env.VITE_AUTH0_DOMAIN),
   auth0ClientId : String(import.meta.env.VITE_AUTH0_CLIENT_ID),

   //cloudinery

   cloudineryCloudName : String(import.meta.env.VITE_CLOUDINERY_CLOUD_NAME),
   cloudineryUploadPreset : String(import.meta.env.VITE_CLOUDINERY_UPLOAD_PRESET)
}