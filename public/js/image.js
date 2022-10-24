const uploadButton = document.getElementById('upload')
// API setup to use filepicker and store image URL
const apikey = 'A2Cms4wvRRnqHepwihpV0z';
const client = filestack.init(apikey);
const options = {
  maxFiles: 1,
  uploadInBackground: false,
  onOpen: () => console.log('opened!'),
  onUploadDone: (res) => imgUrl = res.filesUploaded[0].url
};

// Event listener on upload button to open file picker
uploadButton.addEventListener('click', function () {
  client.picker(options).open();
});