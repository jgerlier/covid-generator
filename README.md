~~Deployed at https://covid-generator.herokuapp.com/~~
The website is not useful anymore now that the form is not needed to go out.

## How is the PDF generated ?

The server uses [Pupetteer](https://github.com/puppeteer/puppeteer) to submit the form on [the offical website](https://media.interieur.gouv.fr/deplacement-covid-19/).

The PDF stored on the server is deleted after 5 minutes.

## Where are the profiles stored ?

The profiles are stored locally in the brower in the IndexedDB dabatase.
