import { LightningElement, wire } from 'lwc';
import getShoes from '@salesforce/apex/ShoeController.getShoes';

export default class ShoeList extends LightningElement {
 shoesData;
 
 error;
    @wire(getShoes) shoes({data, error}){
        if (data){
            this.shoesData= data;
        }else if(error){
            console.log('error:' +  JSON.stringify(error));
            this.error= 'There was an error loading data, please contact your administrator';
        }
    }   
}