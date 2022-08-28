import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CountriesService } from 'src/app/services/http/countries.service';



@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})
export class FormsComponent implements OnInit {

  
  data: any;
  countries:any = [];
  techno:any = [];
  name = "MOHAMED ZIDANE";

  questionnary = {
    company: {
      name: "",
      country: "",
      supervisor: "",
      tel_supervisor: "",
      mail_supervisoir: ""
    },
    work: {
      type: "",
      contract: "",
      duration: ""
    },
    tech: {
      general_idea: "",
      techs: [],
      recom: 0,
      reaction: 0,
      favorite_look: "",
      improvements: "",
      sug: ""
    }
  };
  constructor(private countryService: CountriesService, private router: Router) { }

  ngOnInit(): void {

    this.getCountries();
    
  }

  getCountries() {
    this.countryService.getJSON().subscribe(
      (s) => {
        // console.log(s);
        this.data = s;

        this.test();
      }, (e) => {
        console.log(e);
        
      }
    );
  }

  test() {
    for (const key in this.data) {
      this.countries.push(this.data[key]);
    }
  }


  onChecked(event: any) {

    if (this.techno.includes(event.target.value)) {
      console.log("in");
      
      var filtered = this.techno.filter(function(value:any, index:any, arr:any){ 
        return value !== event.target.value;
      });

      this.techno = filtered;
      this.questionnary.tech.techs = this.techno;

    } else {

      console.log("out");

      this.techno.push(event.target.value);
      this.questionnary.tech.techs = this.techno;

    }
    
    

    /* this.techno.push(event.target.value);

    this.questionnary.tech.techs.push(event.target.value) */
    
  }

  save() {
    console.log(this.techno);
    
    console.log(this.questionnary);


    localStorage.setItem("forms", JSON.stringify(this.questionnary));

    this.router.navigateByUrl("/document");
    
  }

}
