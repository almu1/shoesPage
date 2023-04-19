# Test
CC DEV: There is a business requirement to add a search refinement on the PLP that filters the products based on an attribute called stock level. After analysis, it was clear that the PIM cannont provide this information and we need to build a job that runs daily that updates all site products' stock level attribute:

 'Running out' if stock is less than 50

 'There is still time' if stock is between 50 and 100

 'There is enough for everyone' if stock is above 100.

In case some products fail to update we need to store these in a custom object and send an email to the admin team that some product failed.


Please provide code and the xml for custom object and job

-----



Full stck (no CC experience): On our shoe selling site, on the product page, we need to display the average of ratings. Moreover we need to display the fitting of the shoe based on the median of the customer reviews The customer review object looks like

{

 customerID: String,

 rating: Number -> 1-5

 fitting: String -> [Too Small, a little small, true to size, a little big, too big]

 reviewFeedback: [TEXT]

}



Finally, we also need to display the 5 most favorable reviews on the product detail page.

Please provide code and the sample reviews object that you used

---------------------------------------------------------------

# Shoe Products Page

For this test I have simplified things that in the real world I would do differently. I used TrailHead Playground dev to peform the test.
1. I used a custom simple shoe product object, salesforce has its own product object that has interesting fields, data relations and functionality. But for this test we dont need that. So i created a simple object with 3 fields. I could have used the SF project object. 
2. In the review custom object that I created I use customerId, again this was for simplicity I could have used the existing account object and create a relationship with the custom review object and the salesforce account object. 
3. Unit test I did not add, I am not familiar with how to do them here for this project, im sure I can learn but it was too much time consuming for this exercise. In my day to day we dont deliver code without unit testing. I included notes on where I would definitely include unit tests. 

I created 3 custom objects: 
Shoe__c, Review__c and Fitting__c. Review__c has two relationships: one with Shoe and one with Fitting objects. 

I retrieve the data using 2 apix controllers. I include them as separate files here, one is the shoeController and the other one is the ReviewController. The data obtained from ReviewController has also the relationship data for shoe and fitting. 

I have only two Lightning components one is she shoeList, that only retrieves the shoes and has a parent relathionship with the shoeEntry component. 



#  Included: 
1. A shoePage demo image: shoePageDemo.png in the root folder.
1. Code for assigment: in the  force-app\main\default\lwc  folder
2. Two files with the apex back-end classes in the root directory inside the apexControllers:  shoeController.apxc and reviewController.apxc
3. Exported data see folder shoePageSampleDataFiles.txt 
