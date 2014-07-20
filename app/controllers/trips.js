var mongoose = require('mongoose'),
           _ = require('underscore'),
        jade = require('jade'),
        Trip = mongoose.model('Trip'),
      config = require('../../config/config');

exports.index = function(req, res) {
  // Trip.count({}).exec(function(err, total) {
    Trip.find({})
      // .sort({ c_at: -1 })
      .exec(
        function(err, trips) {
          console.log(trips);
          console.dir(trips);
          if (err) { return res.render('500', { error: "Server error" }); }
          res.render('trips/index', { title: 'trips', trips: trips});
        }
      );
  // });
};

exports.create = function(req, res) {
  var new_trip = new Trip({ trip_id: req.trip_id, start_time: req.start_time, start_station: req.start_station });
  console.log('created a trip ?');
  new_trip.save(function(err, trip) {
    // if (err) { return res.jsonp(422, 'validation error'); }
    console.log('new trip: ', trip);
    console.dir(trip);
    // res.render('trips/index', { title: 'trips'});
  });
};


exports.createTrip = function(tripObj) {
  var new_trip = new Trip({
    trip_id: tripObj.trip_id,
    start_time: tripObj.start_time,
    end_time: tripObj.end_time,
    start_station: tripObj.start_station,
    end_station: tripObj.end_station,
    duration: tripObj.duration
  });
  new_trip.save(function(err, trip) {
    // if (err) { return res.jsonp(422, 'validation error'); }
    console.log('> CREATED NEW TRIP');
    console.dir(trip);
    return true;
  });
};

// exports.show = function(req, res) {
//   res.render('projects/show', {
//     title: 'Project Editor',
//     interfaces: req.user.ui_templates,
//     project: req.project,
//     formats: Project.formats,
//     config: config
//   });
// };

// exports.destroy = function(req, res) {
//   req.project.remove(function (err, project) {
//     Video.findById(project.video_id, function (err, video) {
//       if (video) { video.remove(); }
//       res.jsonp({ id: project._id });
//     });
//   });
// };

// // curl -i -XPOST -b cookiejar.txt 'http://localhost:3000/projects/532626e7e7937e2e511829fe/deploy'
// exports.deploy = function(req, res) {
//   var project = req.project;
//   exports.getMetadata(project,function(metadata){
//     deployer.deploy(project,metadata,function(err,data){
//         if (err) console.error(err);
//         project.set_status('deployed');
//         res.json(data);
//     });
//   });
// };

// exports.project = function(req, res, next, id) {
//   if ( ! req.user ) { return res.redirect('/signin'); }
//     Project.findOne({ _id: id}).exec(function(err, project) {
//       if (err || !project) {
//         err = err || (new Error('Project not found ' + id));
//         return next(err);
//       }
//       if (!project.user_id.equals(req.user._id) && !req.user.isAdmin()){
//         return res.render('404',{error: "Not found!"});
//       }
//       req.project = project;
//       next();
//     });
// };

// exports.update = function(req, res) {
//   var project = req.project;
//   var data = req.body;
//   console.log(data);
//   project.ad_format = data.ad_format;

//   // Update items
//   if ( data.tags ) {
//     data.tags.forEach(function(tag,idx){
//       for (var attr in tag){
//         if (tag.hasOwnProperty(attr))
//           project.tags[idx][attr] = tag[attr];
//       }
//     });
//     delete data.tags;
//   }

//   // Update rest of the project
//   for (var attr in data){
//    if (data.hasOwnProperty(attr))
//      project[attr] = data[attr];
//   }
//   project.save(function(err,project){
//     res.json(project);
//   });
// };

// exports.preview = function(req,res){
//   var UIName = req.project.ui_name;
//   var ui_html;

//   UInterface.findOne({name: UIName},function(err,ui){
//     var ui_html = jade.renderFile('app/views/uinterface/'+ui.view_template,{
//       ui_folder_path: '/fuiszplayer/templates/'+UIName.toLowerCase()+'/',
//       metadata: '/api/projects/'+req.project._id+'/metadata.json',
//       isDebug: req.query.debug || false,
//       project: req.project
//     });
//     res.render('adformats/'+req.project.ad_format.toLowerCase(), {
//       metadata: '/api/projects/'+req.project._id+'/metadata.json',
//       ui_html: ui_html,
//       ui: ui,
//       clickThroughCallback: false,
//       isDebug: req.query.debug || false,
//       project: req.project
//     });
//   });
// };

// exports.getMetadata = function(project,callback){
//     var metadata = {};
//     metadata.video_url = [];
//     Video.findById(project.video_id,function(err,video){
//       if (project.player =='YouTube'){
//         if (video.youtube_url){
//           metadata.video_url.push({type: 'video/youtube', src: video.youtube_url});
//         } else{
//           metadata.video_url.push({type: 'video/youtube', src: project.ui_attributes.youtube_url});
//         }
//       } else{
//         metadata.video_url.push({type: 'video/mp4',src: video.uploaded_url_mp4()});
//         metadata.video_url.push({type: 'video/webm',src: video.uploaded_url_webm()});
//       }
//       metadata.videoWidth = video.w;
//       metadata.videoHeight = video.h;
//       metadata.fps = video.fps;
//       metadata.player= project.player;
//       metadata.project_id = project._id;
//       metadata.ad_format = project.ad_format;
//       metadata.ui_name = project.ui_name;
//       metadata.ui_attributes = project.ui_attributes;
//       metadata.items_attributes = {};
//       project.tags.forEach(function(item){
//         metadata.items_attributes[item._id]={};
//         metadata.items_attributes[item._id].item_id=item._id;
//         metadata.items_attributes[item._id].reference=item.reference;
//         metadata.items_attributes[item._id].name=item.name;
//         metadata.items_attributes[item._id].attributes=item.attributes;
//       });
//       Tag.find({project_id: project._id},function(err,tags){
//         // Group by frame
//         var tags_obj = {};
//         tags.forEach(function(anno){
//           if (!metadata.items_attributes[anno.ui_tag_id]){
//             return;
//           }
//           if (tags_obj.hasOwnProperty(anno.f)){
//             tags_obj[anno.f].push({item_id: anno.ui_tag_id,
//             rect: [ anno.x, anno.y, anno.w, anno.h],
//             tag_id: anno.origin});
//           }
//           else{
//             tags_obj[anno.f]=[{item_id: anno.ui_tag_id,
//             rect: [ anno.x, anno.y, anno.w, anno.h],
//             tag_id: anno.origin}];
//           }
//         });
//         metadata.tags= tags_obj;
//         callback(metadata);
//       });
//     });
// };

// global.projectId = null;

// exports.getAnalytics = function(req,res){
// 	var projectId = req.params.projectId;
// 	Project.findById(projectId,function(err,project){
// 		if(err) {return res.jsonp(422,err);}
// 		if (project === null) {return res.jsonp(404);}
// 		exports.getMetadata(project,function(metadata){
//       	//res.jsonp(metadata);
//       	res.render('projects/fuiszanalytics/analytics', {
//           metadata: metadata,
//           projectId: global.projectId || metadata.project_id
//         });
//     });
//   });
// }

// exports.getAnalyticsItems = function(req,res){
// 	var projectId = req.params.projectId;
// 	Project.findById(projectId,function(err,project){
// 		if(err) {return res.jsonp(422,err);}
// 		if (project === null) {return res.jsonp(404);}
// 		exports.getMetadata(project,function(metadata){
//       	//res.jsonp(metadata);
//       	res.render('projects/fuiszanalytics/items', {
//           metadata: metadata,
//           projectId: global.projectId || metadata.project_id
//         });
//     });
//   });
// }

// exports.getAnalyticsGeo = function(req,res){
// 	var projectId = req.params.projectId;
// 	Project.findById(projectId,function(err,project){
// 		if(err) {return res.jsonp(422,err);}
// 		if (project === null) {return res.jsonp(404);}
// 		exports.getMetadata(project,function(metadata){
//       	//res.jsonp(metadata);
//       	res.render('projects/fuiszanalytics/geo', {
//           metadata: metadata,
//           projectId: global.projectId || metadata.project_id
//         });
//     });
//   });
// }

// exports.getAnalyticsSystem = function(req,res){
//   var projectId = req.params.projectId;
//   Project.findById(projectId,function(err,project){
//     if(err) {return res.jsonp(422,err);}
//     if (project === null) {return res.jsonp(404);}
//     exports.getMetadata(project,function(metadata){
//         //res.jsonp(metadata);
//         res.render('projects/fuiszanalytics/system', {
//           metadata: metadata,
//           projectId: global.projectId || metadata.project_id
//         });
//     });
//   });
// }

// exports.getMixpanelDump = function(req,res){
//   var projectId = req.params.projectId;
//   Project.findById(projectId,function(err,project){
//     console.log("check if project exists..");
//     if(err) {return res.jsonp(422,err);}
//     if (project === null) {return res.jsonp(404);}
//   });
//   var startdate = req.param('startdate');
//   var enddate = req.param('enddate');
//   var projectExists = false;
//   var mx = new mixpanel({
//     api_key: config.mixpanel.api_key,
//     api_secret: config.mixpanel.api_secret
//   });
//   //https://mixpanel.com/api/2.0/events/properties/values?name=project_id&event=interaction&limit=255&api_key=d4995b3f5b837af069400f8f033ff127&expire=1403642661&sig=40ca1a98d7e6684a9a2005a82da84743
//   mx.request(
//     'events/properties/values/',
//     {
//         name : 'project_id',
//         event : 'impression',
//         type: 'general',
//         unit : 'day',
//         from_date : startdate,
//         to_date : enddate
//     },
//     function(error, data) {
//       if(data!=null)
//       {
//         for(var i=0;i<data.length;i++)
//         {
//           console.log(data[i]);
//           if(data[i] == projectId){
//             console.log(data[i] +" : "+projectId);
//             projectExists = true;
//             if(projectExists)
//             {
//               console.log("downloading report..");
//               var fs = require('fs');
//               var file = 'mixpaneldump.json';
//               var wstream = fs.createWriteStream(file);
//               mx.export_data({ from_date: startdate, to_date: enddate ,where : '"'+projectId+'" in properties ["project_id"]'}, function(dump) {
//                 dump.on('data', function(event_object) {
//                     console.dir(JSON.stringify(event_object,null, 2));
//                     wstream.write(JSON.stringify(event_object,null, 2));

//                 });
//                 dump.on('end', function() {
//                     wstream.end();
//                     res.download(file);

//                 });
//               });
//               break;
//             }
//           }
//         }
//       }
//     }
//   );
// }


// exports.renderMetadata = function(req,res){
//   var projectId = req.params.projectId;
//   Project.findById(projectId,function(err,project){
//     if (err) {return res.jsonp(422,err); }
//     if (project === null) {return res.jsonp(404);}
//     exports.getMetadata(project,function(metadata){
//       res.jsonp(metadata);
//     });
//   });
// };

