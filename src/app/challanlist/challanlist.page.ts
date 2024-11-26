import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'api.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-challanlist',
  templateUrl: './challanlist.page.html',
  styleUrls: ['./challanlist.page.scss'],
})
export class ChallanlistPage {
  challanList: any[] = [];

  constructor(
    private router: Router,
    private apiService: ApiService,
    private urlParam: ActivatedRoute,
    public MainApp: AppComponent
  ) {
    this.getChallan();
    console.log(this.challanList);
  }
  getChallan() {
    this.apiService
      .getToken()
      .then((e: any) => {
        this.apiService
          .getChallanFees(e.access_token)
          .then(async (resf: any) => {
            console.log('Challan Fees:', resf);
            this.challanList = resf.data.challan_fee_list;

            this.challanList.map((i: any) => {
              i.licensePercentageValueAdd = this.addPercentage(Number(i.Total_License_Fee), Number(i.SRB))
              i.subLicenseStatus = false;
              if(i.licensefee.length !== 0) {
                i.subLicenseStatus = true;
              }
              return {
                ...i,
                licensePercentageValueAdd: Number(i.licensePercentageValueAdd),
                subLicenseStatus: true,
              }
            })

            


            this.apiService
              .getNatureList(e.access_token)
              .then(async (res: any) => {
                console.log('Nature List:', res);

                // Iterate over challanList and update each item directly
                this.challanList = this.challanList.map((challanItem: any) => {
                  // Find all matching Nature_of_Business_Title for each Premises_Name id
                  const natureTitles = challanItem.Premises_Name.map(
                    (uid: any) => {
                      const matchingNature = res.data.find(
                        (natureItem: any) => uid == natureItem.id
                      );
                      return matchingNature
                        ? matchingNature.Nature_of_Business_Title
                        : null;
                    }
                  ).filter((title: any) => title !== null); // Filter out null values if no match

                  // If we have matching nature titles, add them to the challan item
                  return {
                    ...challanItem,
                    Premises_Name:
                      natureTitles.length > 0 ? natureTitles : null,
                  };
                });

                console.log(
                  'Updated Challan List with Nature Titles:',
                  this.challanList
                );
              });

            this.apiService
              .getCategoryList(e.access_token)
              .then(async (res: any) => {
                console.log('Category List:', res);

                this.challanList = this.challanList.map((challanItem: any) => {
                  // Find the matching category item based on Category ID
                  const matchingCategory = res.data.find(
                    (categoryItem: any) =>
                      challanItem.Category === categoryItem.id
                  );

                  return {
                    ...challanItem,
                    // Set Category to Category_Title if a matching category is found, otherwise set it to null
                    Category: matchingCategory
                      ? matchingCategory.Category_Title
                      : null,
                  };
                });

                console.log(
                  'Updated Challan List with Category Titles:',
                  this.challanList
                );
              });
          console.log("this.challanList",this.challanList)

          })
          .catch((err: any) => {
            console.error('Error fetching Challan Fees:', err);
          });

      })
      .catch((err: any) => {
        console.error('Error fetching Token:', err);
      });
  }

  addPercentage(baseValue: any, percentage: any): string {
    // Ensure the inputs are valid numbers
    if (typeof baseValue !== "number" || typeof percentage !== "number") {
        throw new Error("Both arguments must be numbers");
    }

    // Calculate the percentage and return the result rounded to two decimal places
    return (baseValue + baseValue * (percentage / 100)).toFixed(2);
}
  
}
