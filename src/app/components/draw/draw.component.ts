import { Component, OnInit, Input, ViewChild,ElementRef, HostListener } from '@angular/core';
import html2canvas from 'html2canvas';
import {fromEvent} from 'rxjs';
import { map, tap, switchMap, takeUntil, finalize} from 'rxjs/operators';

declare global {
  interface Window { saveAs: any; }
}

window.saveAs = window.saveAs || {};

@Component({
  selector: 'app-draw',
  templateUrl: './draw.component.html',
  styleUrls: ['./draw.component.css']
})
export class DrawComponent implements OnInit {

  @ViewChild('canvas', {static: true}) canvas: ElementRef<HTMLCanvasElement> | any; 
  @ViewChild('downloadLink') downloadLink: ElementRef | any;
  ctx: CanvasRenderingContext2D | any;

  

  constructor() { }

  ngOnInit(): void {
  }

  
  ngAfterViewInit() {
    this.ctx = this.canvas.nativeElement.getContext('2d');
    const mouseDownStream = fromEvent(this.canvas.nativeElement, 'mousedown');
    const mouseMoveStream = fromEvent(this.canvas.nativeElement, 'mousemove');
    const mouseUpStream = fromEvent(window, 'mouseup');
    mouseDownStream.pipe(
      tap((event: MouseEvent | any) => {
        this.ctx.beginPath();
        this.ctx.strokeStyle = 'red';
        this.ctx.lineWidth = 5;
        this.ctx.lineJoin = 'round';
        this.ctx.moveTo(event.offsetX, event.offsetY);
      }),
      switchMap(() => mouseMoveStream.pipe(
        tap((event: MouseEvent | any) => {
          this.ctx.lineTo(event.offsetX, event.offsetY);
          this.ctx.stroke();
        }),
        takeUntil(mouseUpStream),
        finalize(() => {
          this.ctx.closePath();
        })
      ))
    ).subscribe(console.log);
  }


  save() {
    
    
  }

  downloadImage(){

    html2canvas(this.canvas.nativeElement).then(function(canvas) {
      // Convert the canvas to blob
      canvas.toBlob(function(blob:any){
          // To download directly on browser default 'downloads' location
          let link:any = document.createElement("a");
          link.download = "image.png";
          link.href = URL.createObjectURL(blob);
          link.click();

          // To save manually somewhere in file 
          
          window.saveAs(blob, 'image.png');

      },'image/png');
  });
    
    }



}
