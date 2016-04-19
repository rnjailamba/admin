$(document).ready(function () {
    <!--alert("here");-->

    var stInstance  = new SirTrevor.Editor( {
        el: $('.js-st-instance'),
        defaultType: "Image",
//        required: [
//            "Heading",
//            "Text"
//          ],
         onEditorRender : function() {
              // this.block_manager.createBlock("OrderedList");
              this.block_manager.createBlock("CaptionedImage");

            },
           blockTypes: [
                       "Text",
                       "Heading",
                       "Image",
                       "List",
                       "Quote",
                       "Tweet",
                       "Video",
                       "OrderedList",
                       "CaptionedImage"
                     ],
        onFormSubmit: function(){
            alert("form submitted");
        }
    });

      $('.submit').on('click', function(e) {
        e.preventDefault();

        // Skip validaton for now, we're just saving as we're going
        SirTrevor.SKIP_VALIDATION = true;

        // Store the current set of cards
        SirTrevor.onBeforeSubmit();

        // Grab the data
        var json = SirTrevor.getInstance().store.retrieve();
        console.log(json);

        // var imagePath = SirTrevor.getInstance().blocks;
        // var imagePath = SirTrevor.Blocks.Image;
        // console.log(imagePath);


        // Turn validation back on
        SirTrevor.SKIP_VALIDATION = false;

//        $('.output').html(JSON.stringify(json, null, ' '));
        $('.output').text($('.js-st-instance').val());
      });

    // SirTrevor.setDefaults({
    //   uploadUrl: "https://cementifyblogimages.s3-ap-southeast-1.amazonaws.com/1454841932002.jpg?AWSAccessKeyId=AKIAJDTELPCXKB6E3LBQ&Content-Type=image%3Bcharset%3DUTF-8&Expires=1460841932&Signature=S8sgrSI%2FQgmonHYHogye14sRE6o%3D"
    // });
    SirTrevor.EventBus.on('block:create:new', function(){
     console.log("arguments are " ,arguments);
    });




   /*
    * Extended Image Block
    * 2014 Ændrew Rininsland <aendrew.rininsland@the-times.co.uk>
    * Based on neyre/sir-trevor-wp's ImageCaption.js block.
    */


//   SirTrevor.Blocks.ImageExtended = SirTrevor.Blocks.Image.extend({
//
//     type: "image_extended",
//     title: function() { return i18n.t('blocks:image:title'); },
//
//     droppable: true,
//     uploadable: true,
//
//     icon_name: 'image',
//
//     loadData: function(data){
//       // Create our image tag
//       this.$editor.html($('<img>', { src: function () { if (!data.file[0]) { return data.file.url } else { return data.file[0].url } }})).show();
//       this.$editor.append($('<input>', {type: 'text', class: 'st-input-string js-caption-input', name: 'caption', placeholder: 'Caption', style: 'width: 100%; margin-top:10px; text-align: center;', value: data.caption}));
//       this.$editor.append($('<input>', {type: 'text', class: 'st-input-string js-source-input', name: 'source', placeholder: 'Source', style: 'width: 100%; margin-top:10px; text-align: center;', value: data.source}));
//       this.$editor.append($('<label for="js-lightbox-input">Lightbox?</label>'));
////       this.$editor.append($('<input>', {type: 'checkbox', class: 'st-input-boolean js-lightbox-input', name: 'lightbox', style: '', value: data.lightboxchecked: function(){if(data.lightbox=='on'){return true}else{return false}}})))}));
////       this.$editor.append($('<label for="js-stretch-input">Stretch?</label>'));
////       this.$editor.append($('<input>', {type: 'checkbox', class: 'st-input-boolean js-stretch-input', name: 'stretch', style: '', value: data.stretchchecked: function(){if(data.stretch=='on'){return true}else{return false}}})))}));
//     },
//
//     onBlockRender: function(){
//       /* Setup the upload button */
//       this.$inputs.find('button').bind('click', function(ev){ ev.preventDefault(); });
//       this.$inputs.find('input').on('change', _.bind(function(ev){
//         this.onDrop(ev.currentTarget);
//       }, this)).prop('accept','image/*');
//     },
//
//   	onDrop: function(transferData){
//   	  var file = transferData.files[0],
//   	      urlAPI = (typeof URL !== "undefined") ? URL : (typeof webkitURL !== "undefined") ? webkitURL : null;
//
//   	  // Handle one upload at a time
//   	  if (/image/.test(file.type)) {
//   	    this.loading();
//   	    // Show this image on here
//   	    this.$inputs.hide();
//   	    this.loadData({file: {url: urlAPI.createObjectURL(file)}});
//
//   	    this.uploader(
//   	      file,
//   	      function(data) {
//   	        this.setData(data);
//   	        this.ready();
//   	      },
//   	      function(error){
//   	        this.addMessage(i18n.t('blocks:image:upload_error'));
//   	        this.ready();
//   	      }
//   	    );
//   	  }
//   	}
//
//   });

});