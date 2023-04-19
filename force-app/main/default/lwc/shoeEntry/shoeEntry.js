import { LightningElement, api, wire } from 'lwc';
import { calcAvg, calcMedian } from './utils';
import getReviews from '@salesforce/apex/ReviewController.getReviews';


export default class Entry extends LightningElement {
    @api shoe;
    reviewsList=[];
    error;
    shoeAvgRating;
    shoeMedianFitting;
    bestReviews=[];
    showReviews=false;
    
 
    @wire(getReviews, {shoeName: '$shoe.Name'}) reviews({data, error}){
        //TODO create a unit test when data is null and also empty
        if (data){
            //TODO create a unit test with mock data but there are no reviews for the record. Assert that showReviews is false it will display a message 'No reviews yet...' 
            //TODO create a unit test with positive obtention of data and reviews. Assert that we obtain correct number of records.And reviews are shown.
            this.reviewsList= data;
            if(this.reviewsList.length>0){
                this.showReviews=true;
                this.calcShoeAvgRating();
                this.calcShoeMedianFitting();
                this.calcBestReviews();             
            }     
        
        }else if(error){
            console.log('error:' +  JSON.stringify(error));
            this.error= 'There was an error loading data, please contact your administrator';
        }
    } 
//TODO sample some ratings and assert that the avg calculation is correct. Assert the correct value is obtained.
    calcShoeAvgRating = ()=> {
        let ratings=[];
      
            this.reviewsList.forEach(review => {
                ratings.push(review.Rating__c);
            });
            this.shoeAvgRating=  calcAvg(ratings);
    }
   //TODO sample some fitting numbers and assert that the median calculation is correct assert the correct value is obtained.
    calcShoeMedianFitting() {
       //create a map to be able to get the Median value and display the corresponding name. 
        const fittings = new Map();
        this.reviewsList.forEach(review => {   
            fittings.set(review.FittingId__r.FittingId__c, review.FittingId__r.Name);
        });
       
         this.shoeMedianFitting= fittings.get( calcMedian([...fittings.keys()]))
    }

   //TODO assert the correct best reviews are shown mock some of them and asserth they show in the correct order and the correct number.
    calcBestReviews() {

        const numReviews=5;
        let sortedDescReviews=[];
    
        this.reviewsList.forEach(
            review=>{
                sortedDescReviews.push({rating: review.Rating__c, textFeedback: review.ReviewFeedback__c, customerId: review.CustomerId__c} );           
            } 
        );
        sortedDescReviews.sort((a, b)=>{return b.rating-a.rating});
        
        for(let i=0; i<numReviews; i++){
            this.bestReviews.push(sortedDescReviews[i]);
        }     
    }
}