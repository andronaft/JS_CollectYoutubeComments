const apiKey = /*'Enter your Google apiKey here'*/;

new Vue ({
    el: '#app',
    data: {
        dataComments: 'test',
        downloadLink: '',
        comms: [],
        strComms: '',
        videoId: 'cuKCusm-iOs',
        fileTitle: ''
       
    },
    methods: {
        getData(videoId) {
          console.log(videoId)
          axios.get('https://www.googleapis.com/youtube/v3/commentThreads?textFormat=plainText&part=snippet', {
            params: {
              key: apiKey,
              videoId: this.videoId,
              maxResults: 100
            }
          })
          .then((response) => {
            console.log(response.data);
            this.dataComments = response.data.items;
            var zip = new JSZip();
            
            this.dataComments.forEach((element,index) => {
                
                console.log(element);
                zip.file(`comm${index}.txt`, `Title: ${this.fileTitle}\n${element.snippet.topLevelComment.snippet.textOriginal}\n${element.snippet.topLevelComment.snippet.publishedAt}`);
                
            });
            zip.generateAsync({type:"blob"})
            .then(function(content) {
               
                saveAs(content, "yt.zip");
            });
            console.log(this.strComms)
            var file = new Blob([this.strComms], {type: 'text/plain'});
            this.downloadLink = URL.createObjectURL(file);

          })
          .catch(function (error) {
            console.log(error);
          })
          .then(function () {
          });  
        }
    },
    created(){
       
    }
});