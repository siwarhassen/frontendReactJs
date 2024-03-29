require("babel-register")({
    presets: ["es2015", "react"]
  });
   
  const router = require("./src/sitemap-routes").default;
  const Sitemap = require("react-router-sitemap").default;
  
  function generateSitemap() {
      return (
        new Sitemap(router)
            .build("3aweni.netlify.app")
            .save("./public/sitemap.xml")
      );
  }
  
  generateSitemap();
