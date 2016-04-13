var modules = require('./setup/all_modules');//require all modules that are shared by all controllers
var router = modules.express.Router();
var config = require('../config/config.js');//require all modules that are shared by all controllers
var appConfig = require('../config/appConfig'); // configure service api urls in dev/prod/beta
var redisClient = require('../helpers/exporters/export_redisClient').redisClient;
var loginMiddleWare = require("../helpers/login/api.js");
var mappings = appConfig();


// INDEX
// ============================================== 
router.get('/index', function(req, res){
   
  	loginMiddleWare.functions.isLoggedInWithRender(req,res,redisClient,'blog/index',null);

});


// INDEX
// ============================================== 
router.get('/', function(req, res){
   
  	loginMiddleWare.functions.isLoggedInWithRender(req,res,redisClient,'blog/index',null);

});


// EDIT
// ============================================== 
router.get('/editPost/:id', function(req, res){
   
  var blogId = req.params.id;
  var blogContentPromise = getBlogContentPromise(blogId);
  var blogCommentsPromise = getBlogCommentsPromise(blogId,1);

  modules.Promise.all([blogContentPromise,blogCommentsPromise]).then(function(results){
    console.log("data from blog contetn promeis",results[0]);
    console.log("data from blog contetn promeis",results[1]);
    var combinedData = getCombinedObjects(results[0],results[1]);
    loginMiddleWare.functions.isLoggedInWithRender(req,res,redisClient,'blog/editPost',combinedData);
  })
  .catch(function(error){
    //do something with the error and handle it
  });  

});


router.post('/editPost/:id', function(req, res){

  var blogId = req.params.id;
   
  console.log("in the post of editPost",req.body);
  var data = {};
  data.approvedBy = loginMiddleWare.functions.getCustomerId(req,res);
  data.categoryId = req.body.category;
  data.subCategoryId = req.body.subcategory;
  data.title = req.body.title;
  data.isVerified = true;
  data.paragraphs =  [
                          {
                              "imageList": req.body.imageURLs,
                              "paragraphType": "Image"
                          },    
                          {
                              "text": req.body.tinymceText,
                              "paragraphType": "Text"
                          }                 
                      ];

  console.log(JSON.stringify(data));
  modules.request({
      url:mappings['blogService.updateBlog'], 
      method: 'POST',
      json: data
    },
      function (error, response, body) {
        if (!error && response.statusCode == 200) {
          bodyRet = body; 
          console.log("pring returned bodyyy");
          res.status(200).send(response);

        }
        else{
          console.log("not signed up successfully");
          res.status(404).send(response);

        }
   });

});


// PING
// ============================================== 
router.get('/ping', function(req, res){
  // var bodyRet;
  // modules.request(
  //       {url:mappings['blogService.ping']}, 
  //       function (error, response, body) {
  //         if (!error && response.statusCode == 200) {
  //                 bodyRet = body;

  //           console.log("pring returned body1",body);
  //           res.send(body);
  //         }
  //         else{

  //         }
  //    });

   // var data = {};
   //  data.postedBy = 12;
   //  data.categoryId = 11;
   //  data.isVerified = false;
   //  data.noOfCommentsCollections = 0;
   //  data.paragraphs =  [
   //                          {
   //                              "text": "hello mister",
   //                              "paragraphType": "Text"
   //                          }
   //                      ];

   // modules.request({
   //      url:mappings['blogService.createBlog'], 
   //      method: 'POST',
   //      json: data
   //    },
   //      function (error, response, body) {
   //        if (!error && response.statusCode == 200) {
   //                bodyRet = body; 

   //          console.log("pring returned bodyyy");
   //          res.status(200).send(body);
   //        }
   //        else{
   //                      res.status(404).send(response);

   //          console.log("not signed up successfully");
   //        }
   //   });

// {
//     "blogId": "56f96717ebd6a00df7af2021",
//     "comment": {
//         "postedBy": {
//             "userName": "raj",
//             "userId": 1234
//         },
//         "commentContent": {
//             "text": "hellocomment",
//             "paragraphType": "Text"
//         }
//     }
// }

    // var data = {};
    // data.blogId = "5701ebf996311f1bb22035ca";
    // data.parentId = "5701ebf996311f1bb22035ca";
    // data.comment =  {
    //                     "postedBy": {
    //                         "userName": "raj",
    //                         "userId": 1234
    //                     },
    //                     "commentContent": {
    //                         "text": "hellocomment",
    //                         "paragraphType": "Text"
    //                     }
    //                 };

    // modules.request({
    //     url:mappings['blogService.addComment'], 
    //     method: 'POST',
    //     json: data
    //   },
    //     function (error, response, body) {
    //       if (!error && response.statusCode == 200) {
    //               bodyRet = body; 

    //         console.log("pring returned bodyyy");
    //         res.status(200).send(body);
    //       }
    //       else{
    //                     res.status(404).send(response);

    //         console.log("not signed up successfully");
    //       }
    //  });


    // var data = {};
    // data.blogId = "5706648396311f367ef75546";

    // modules.request({
    //     url:mappings['blogService.readBlogs'], 
    //     method: 'POST',
    //     json: data
    //   },
    //     function (error, response, body) {
    //       if (!error && response.statusCode == 200) {
    //         console.log("pring returned bodyyy");
    //         res.status(200).send(body);
    //       }
    //       else{
    //         res.status(404).send(response);
    //         console.log("not signed up successfully");
    //       }
    //  });

    // var data = {};
    // data.blogId = "5706648396311f367ef75546";
    // data.collectionNo = 1;
    // modules.request({
    //     url:mappings['blogService.readComments'], 
    //     method: 'POST',
    //     json: data
    //   },
    //     function (error, response, body) {
    //       if (!error && response.statusCode == 200) {
    //         console.log("pring returned bodyyy");
    //         var comments = body["comments"];
    //         var obj = comments;
    //         var arrayComments = new Array();
    //         for (var i=0; i<obj.length; i++){
    //           var dataCompressedComments = obj[i]["commentContent"];
    //           dataCompressedComments.postedByUserName = obj[i]["postedBy"]["userName"];
    //           dataCompressedComments.postedByUserId = obj[i]["postedBy"]["userId"];
    //           dataCompressedComments.createdDate = obj[i]["createdDate"];
    //           dataCompressedComments.modifiedDate = obj[i]["modifiedDate"];
    //           dataCompressedComments.noOfReplyCommentsCollections = obj[i]["noOfReplyCommentsCollections"];
    //           dataCompressedComments.softDelete = obj[i]["softDelete"];

    //           arrayComments.push(dataCompressedComments);
    //         }
    //         res.status(200).send(JSON.stringify(body));
    //       }
    //       else{
    //         res.status(404).send(response);
    //         console.log("not signed up successfully");
    //       }
    //  });   




   var data = {};
   var oldBlogCondition = {};
   oldBlogCondition.blogId = "570d2a9696311f695812a10e";
   data.oldBlogCondition = oldBlogCondition;

   var newBlogData = {};

    newBlogData.postedBy = 1296;
    newBlogData.categoryId = 11;
    newBlogData.subCategoryId = 11;
    newBlogData.isVerified = true;
    newBlogData.paragraphs =  [
                            {
                                "text": "hello mister",
                                "paragraphType": "Text"
                            }
                        ];
    data.newBlogData = newBlogData;
    data.userAboutus =  "heelo friend";
    data.name =  "raj";
    data.coverImage =  "imge.com";
    data.customerId =  1296 ;          
    console.log("update request",data)        

    modules.request({
        url:mappings['blogService.updateBlog'], 
        method: 'POST',
        json: data
      },
        function (error, response, body) {
          if (!error && response.statusCode == 200) {
            bodyRet = body; 
            console.log("pring returned bodyyy");
            res.status(200).send(body);
          }
          else{
            res.status(404).send(response);
            console.log("not signed up successfully");
          }
     });

     
});


// GET BLOG COMMENTS PROMISE
// ==============================================
var getBlogCommentsPromise = function(blogId,collectionNo,parentId){
  var data = {};
  data.blogId = blogId;
  data.collectionNo = collectionNo;
  if(parentId == null ){
    data.parentId = blogId;
  }
  else {
    data.parentId = parentId;
  }

  return new modules.Promise(function(resolve, reject){

    modules.request({
        url:mappings['blogService.readComments'], 
        method: 'POST',
        json: data
      },
        function (error, response, body) {
          var arrayComments = new Array();
          if (response.statusCode == 200) {
            console.log("pring returned bodyyy");
            var comments = body["comments"];
            var obj = comments;
            for (var i=0; i<obj.length; i++){
              var dataCompressedComments = obj[i]["commentContent"];
              dataCompressedComments.postedByUserName = obj[i]["postedBy"]["userName"];
              dataCompressedComments.postedByUserId = obj[i]["postedBy"]["userId"];
              dataCompressedComments.createdDate = obj[i]["createdDate"];
              dataCompressedComments.modifiedDate = obj[i]["modifiedDate"];
              dataCompressedComments.noOfReplyCommentsCollections = obj[i]["noOfReplyCommentsCollections"];
              dataCompressedComments.softDelete = obj[i]["softDelete"];
              dataCompressedComments.commentId = obj[i]["commentId"];

              arrayComments.push(dataCompressedComments);
            }
            resolve(JSON.stringify(arrayComments));
          }
          else if( !error ){
            resolve(JSON.stringify(arrayComments));
          }
          else{
            reject(error);
            console.log("could not get the blog comments");
          }
     });     
  });
}


// GET BLOG CONTENT PROMISE
// ==============================================
var getBlogContentPromise = function(blogId){
  var data = {};
  data.blogId = blogId;
  return new modules.Promise(function(resolve, reject){

    modules.request({
        url:mappings['blogService.readBlogs'], 
        method: 'POST',
        json: data
      },
        function (error, response, body) {
          if (response.statusCode == 200) {
            console.log("pring returned bodyyy");
            resolve(JSON.stringify(body));
          }
          else if( !error ){
            resolve(JSON.stringify(body));
          }          
          else{
            reject(error);
            console.log("could not get blog contents from the promise");
          }
     });     
  });
}


// COMBINE OBJECTS
// ==============================================
var getCombinedObjects = function(obj1,obj2){
  var obj3 = {};
  obj3.content = obj1;
  obj3.comments = obj2;
  return obj3;
}


var justPrintSomething = function(){
    console.log("print something");
}

module.exports.router = router;
