import express from "express";
import bodyParser from "body-parser";
import path from "path";
import multer from "multer";

const app = express();
const PORT = 3000;

// Set storage engine for Multer
const storage = multer.diskStorage({
  destination: "./public/images",
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");
// Multer uploading
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, 
}).single("imageUrl");

const originalPosts = [
  
  {
    id: 1,
    title: "Manto and Ashak",
    description:
     "Mento is an extremely delicious Afghan food, especially in Herat and Kabul provinces. This dish is prepared in a special container from dough and boiling water and the ingredients that fill it inside, and after it is made, it is decorated with Qormah and Qorot.",
    imageUrl: "images/manto.png",
  },
  {
    id: 2,
    title: "Qaboli Ozbeki ",
    description:
    "Uzbek Qabbli is the best Afghan food that can be described to a foreigner and be served as a guest. In general, Afghan Uzbek Qabbli is very famous in all provinces of Afghanistan, but it is the most popular in provinces such as Kandahar, Jalalabad, and Mazar-e-Sharif. This delicious dish is cooked with natural sesame oil, and the chefs add fresh and delicious mutton and serve it together, which is very, very, very tasty and healthy.",
    imageUrl: "images/qaboli-ozbaki.png",
  },
  {
    id: 3,
    title: "Bolani",
    description:
      "Bolani is the most famous authentic food of Kabulis and all over Afghanistan, and it is extremely delicious. It is made from dough and ingredients such as vegetables, potatoes, and minced meat, which are filled inside and fried in oil. Then have it with chutney. This dish is also consumed a lot in Ramadan and has many fans",
    imageUrl: "images/bolany.png",
  },
  {
    id: 4,
    title: "Kabab Jigar",
    description:
     "Jagger kebab is the royal food and parties of dear Afghans. This popular dish is made from sheep's liver, as they cut the sheep's liver into pieces, then mix it with pepper, salt, garlic, and various spices, put it on skewers, then grill it on the fire, and it is usually more enjoyable with soda.",
    imageUrl: "images/kababjigar.png",
  },
  {
    id: 5,
    title: "Kecheri gosht land ",
    description:
     "Rice and dried meat is one of the local dishes of Afghanistan, which has many fans. This dish is such that the rice is in the form of kecheri and the meat is salted and dried, and then Afghan families use it in the winter season, especially on cold and snowy nights, it is the best food for family parties and gatherings.also It is  my favorite food in the first place",
    imageUrl: "images/kecheri.jpg",
  },

];

let posts = [...originalPosts];

app.get("/", (req, res) => {
  res.render("index", { posts });
});

app.get("/newpost", (req, res) => {
  res.render("newpost");
});

app.post("/newpost", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.error(err);
      // Handle error
    } else {
      const { title, description } = req.body;
      const imageUrl = req.file ? `/images/${req.file.filename}` : null;
      const id = Date.now(); // Generate a unique ID for the post

      const newPost = { id, title, description, imageUrl };
      posts.push(newPost);

      res.redirect("/");
    }
  });
});

app.get("/edit/:id", (req, res) => {
  const postId = parseInt(req.params.id);
  const post = posts.find((post) => post.id === postId);
  res.render("edit", { post });
});

app.post("/edit/:id", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.error(err);
      // Handle error
    } else {
      
     const postId = parseInt(req.params.id);
      const { title, description } = req.body;
      const imageUrl = req.file ? `/images/${req.file.filename}` : null;
      

       const index = posts.findIndex((post) => post.id === postId);
  if (index !== -1) {
    posts[index].title = title;
    posts[index].description = description;
    if (imageUrl) {
      posts[index].imageUrl = imageUrl;
    }
  }
      res.redirect("/");
    }
  });
});


app.post("/delete/:id", (req, res) => {
  const postId = parseInt(req.params.id);
  posts = posts.filter((post) => post.id !== postId);

  res.redirect("/");
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
