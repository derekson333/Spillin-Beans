// import * as filestack from 'filestack-js';
// const client = filestack.init('A2Cms4wvRRnqHepwihpV0z');

// client.picker().open();
const apikey = 'A2Cms4wvRRnqHepwihpV0z';
const client = filestack.init(apikey);
const options = {
  maxFiles: 1,
  uploadInBackground: false,
  onOpen: () => console.log('opened!'),
  onUploadDone: (res) => console.log(res),
};


window.addEventListener('upload', function () {
    client.picker(options).open();
  });
  


// needs to go into handlebars page where this is implemented
{/* <script src="//static.filestackapi.com/filestack-js/3.x.x/filestack.min.js"></script>
<script src="/js/image.js"></script> */}