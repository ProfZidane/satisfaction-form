import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';



import * as html2pdf from 'html2pdf.js';
import { Location } from '@angular/common';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css']
})
export class DocumentComponent implements OnInit {
doc: any;
date = new Date();
name = "MOHAMED ZIDANE";

@ViewChild('document') invoiceElement!: ElementRef;
  constructor(private location: Location) { }

  ngOnInit(): void {
    const data = localStorage.getItem("forms");
    if (data) {
      this.doc = JSON.parse(data);
      console.log(this.doc);
      
    }    
  }


  onPrint(divName: any) {
    const printContents = document.getElementById(divName);
    if (printContents) {
      const newprintContents = printContents.innerHTML;
      const originalContents = document.body.innerHTML;
      document.body.innerHTML = newprintContents;
      window.print();
      document.body.innerHTML = originalContents;
    }
}

public generatePDF(): void {

  let DATA: any = document.getElementById('document');

    html2canvas(DATA as any).then((canvas) => {
      let fileWidth = 408;
      let fileHeight = 5000;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('angular-demo.pdf');
    });
}

public SavePDF(): void {  
  let content=this.invoiceElement.nativeElement;  
  let doc = new jsPDF();  
  let _elementHandlers =  
  {  
    '#editor':function(element: any,renderer: any){  
      return true;  
    }  
  };  
  doc.html(content.innerHTML,{  

    callback: function(doc) {
      doc.save('test.pdf');  
    }
  });  

  
}

captureScreen() {
  let data = document.getElementById('contentToConvert');
  html2canvas(data as any).then(canvas => {
      var imgWidth = 210;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;
      const contentDataURL = canvas.toDataURL('image/png');
      let pdfData = new jsPDF('p', 'mm', 'a4');
      var position = 0;
      pdfData.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      pdfData.save(`MyPdf.pdf`);
  });
}


savePDF() {

  // document.getElementById('btn-print').style.display = 'none';
  
  const element = document.getElementById('document');
  if (element) {
    element.style.border = "none";
  }

  var opt = {
    margin:       0.01,
    filename:     'Dossier-recommendation-' + this.doc.company.name + '.pdf',
    html2canvas:  { scale: 2 },
    jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
  };


  html2pdf()
    .set(opt)
    .from(element)
    .save();
  
  setTimeout(() => {
    if (element) {
      element.style.border = "solid 1px gray";
      alert("Veuillez m'envoyez, le document qui sera téléchargé, par mail : madazada0@gmail.com \nMerci à vous!");
    }    
  })
 
}


back() {
  this.location.back();
} 

}
