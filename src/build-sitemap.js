import sm from 'sitemap';
import fs from 'fs';
import routes from 'App';

function urls(array, route, baseUrl) {
  const url = `${baseUrl}${route.path || ''}`;
  if (route.children) {
    route.children.forEach(childRoute => urls(array, childRoute, url));
  } else {
    array.push({
      url: url || '/',
      // ...
    });
  }
  return array;
}

const rootRoute = Array.isArray(routes) ? { path: '', children: routes } : routes;

const sitemap = sm.createSitemap({
    hostname: 'https://3aweni.netlify.app',
    urls: urls([], rootRoute, ''),
});

function buildsitemap() {
  fs.writeFileSync('sitemap.xml', sitemap.toString());
}
export default buildsitemap;
