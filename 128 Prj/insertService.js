var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "admin", 
    database: "blossom_care" 
});

const array = [
  "INSERT INTO Services (service_id, service_name, description, price) VALUES (1, 'Newborn Care and Support', 'Our experts are available to provide comprehensive care and support for your newborn. From feeding and diaper changing to establishing healthy sleep routines, we\\'ll guide you through the early stages of your baby\\'s development.', 200);",
  "INSERT INTO Services (service_id, service_name, description, price) VALUES (2, 'Breastfeeding Consultation', 'Breastfeeding can sometimes be challenging for new moms. Our lactation consultants provide personalized guidance, tips, and techniques to help new moms successfully breastfeed their babies. We address concerns, offer practical solutions, and prioritize comfort for both mom and baby during nursing.', 300);",
  "INSERT INTO Services (service_id, service_name, description, price) VALUES (3, 'Parenting Workshops', 'Join our parenting workshops to gain valuable insights and practical knowledge about various aspects of raising a child. From infant safety to positive discipline techniques, our workshops cover a wide range of topics to equip you with the skills you need to be a confident and effective parent.', 100);",
  "INSERT INTO Services (service_id, service_name, description, price) VALUES (4, 'Sleep Coaching', 'If you\\'re struggling with sleep deprivation due to your baby\\'s erratic sleep patterns, our sleep coaches are here to help. We\\'ll work with you to develop a customized sleep plan tailored to your family\\'s needs, promoting healthy sleep habits for your little one while ensuring you get the rest you need.', 400);",
  "INSERT INTO Services (service_id, service_name, description, price) VALUES (5, 'Postpartum Support', 'Adjusting to life after childbirth can be emotionally and physically demanding. Our postpartum support services offer a compassionate and nurturing environment where you can express your concerns, receive emotional support, and learn self-care techniques to promote your well-being during the postpartum period.', 200);",
  "INSERT INTO Services (service_id, service_name, description, price) VALUES (6, 'Parent-Child Bonding Sessions', 'Building a strong bond with your child is crucial for their development. Our parent-child bonding sessions promote a strong parent-child relationship through activities like baby massage, sensory play, and interactive storytelling. Join us for nurturing experiences and lasting memories.', 150);",
  "INSERT INTO Services (service_id, service_name, description, price) VALUES (7, 'Developmental Milestone Tracking', 'Stay informed about your child\\'s growth and development with our milestone tracking service. Our experts will monitor and assess your child\\'s progress, offering valuable insights and personalized recommendations to ensure they reach important developmental milestones.', 350);",
  "INSERT INTO Services (service_id, service_name, description, price) VALUES (8, 'Maternal Wellness Programs', 'We care about your well-being as a new parent. Our maternal wellness programs focus on nurturing and supporting mothers during the postpartum period. From relaxation techniques to fitness classes and nutritional guidance, we provide holistic support to help you maintain a healthy and balanced lifestyle.', 250);"
];


con.connect(function(err){
   if(err) throw err;
   console.log("connected!");
   for(let i=0; i<array.length; i++){
    con.query(array[i], function(err,result){
        if(err) throw err;
        console.log(`The Service  ${i} has been recorded`);
       })
   }
   
})
