Project architecture:

-Home/Landing page. User will be greeted by the store owner if they're not logged in.
 Home page contains the usual login button along with the 'CATEGORIES' drop down menu

 -Register/login pages are handled as a sliding sheet provided in Angular Material.

-Each category has its own page and all the products are fetched from the fakestoreapi website.

-The shopping cart as its own page where it can be manipulated as one would expect. Shopping cart functionality
 in the home page is also included.

-The checkout page along with the payment process, powered by Stripe, are present and working as one would expect in any modern day web store.


The important bits of information and interactivity on the store are in the center of the page. It is most likely already expected
by the average user but in this case the structure follows Frank Quitely's approach to laying out comic book pages and not necessarily
what is expected by the user.
The website as a whole only implements clicking functionality. It does not have any special hover effects, etc.
A server was implemented in order for the Stripe functionality.
The authentication process is handled by Firebase and the FirebaseTS library.
Instead of writing regular CSS, Tailwind was implemented and its usage will most likely be moved forward onto future projects.
Each category can be sorted to a preferred viewing method/number of products per row.