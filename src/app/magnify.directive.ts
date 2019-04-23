// import { Directive, HostListener, Renderer2, ElementRef, Input } from '@angular/core';

// @Directive({
//     selector: '[appMagnify]'
// })
// export class MagnifyDirective {

//     @Input() imgSrc: any;

//     constructor(public rndr: Renderer2, private elm: ElementRef) {
//         this.rndr.listen(this.elm.nativeElement, "mousemove", this.onMouseOver.bind(this));
//         this.rndr.listen(this.elm.nativeElement, "mouseover", this.onMouseOver.bind(this));
//         this.rndr.listen(this.elm.nativeElement, "mouseover", this.onMouseOut.bind(this));
//     }

//     onMouseOver(event) {

//         if (!document.getElementById('2835')) {
//             // Create magnifier element if not exist
//             const magnify = this.rndr.createElement('div');
//             magnify.setAttribute('id', '2835');
//             magnify.style.zIndex = '99';
//             magnify.style.height = '100px';
//             magnify.style.width = '100px';
//             magnify.style.top = '100px';
//             magnify.style.left = '100px';
//             magnify.style.display = 'block';
//             magnify.style.border = '2px solid #fff';
//             magnify.style.borderRadius = '50%';

//             magnify.style.backgroundImage = 'url(../assets/img.jpg)';
//             magnify.style.position = 'absolute';
//             this.rndr.appendChild(this.elm.nativeElement, magnify);
//         } else {
//             const magnify = document.getElementById('2835');
//             magnify.style.backgroundPosition = `${event.clientY}px ${event.clientX}px`;
//             magnify.style.top = event.clientY + 'px';
//             magnify.style.left = event.clientX + 'px';
//             console.log(event);
//             // Move magnifier as mouse  moves
//         }

//     }

//     onMouseOut(event) {
//         console.log('leave', event);
//     }

// }

import { Directive, ElementRef, Renderer2, HostListener, OnChanges, Input, Host } from '@angular/core';
// import { environment } from '@env/environment';

@Directive({
    selector: '[appMagnify]'
})
export class MagnifyDirective implements OnChanges {

    @Input() imageUrl;
    private img: HTMLImageElement;
    private magnifyGlass: HTMLDivElement;
    private coordinateX: any;
    private coordinateY: any;
    private zoom = 5;
    private glassWidth: any;
    private glassHeight: any;
    private bw: any;
    private defaultImg;

    constructor(private renderer: Renderer2, private el: ElementRef) {
        this.defaultImg = '../assets/img.jpg';
    }


    ngOnChanges() {
        if (this.img) {
            this.renderer.removeChild(this.el.nativeElement, this.img);
        }
        this.img = this.renderer.createElement('IMG');
        this.img.setAttribute('id', 'magnifier-img');
        this.img.setAttribute('src', this.imageUrl);
        this.img.addEventListener('error', () => {
            this.img.src = this.defaultImg;
        });
        this.renderer.appendChild(this.el.nativeElement, this.img);
    }
    @HostListener('mouseenter') onMouseEnter() {
        this.magnify(this.zoom);
        // this.el.nativeElement.addEventListener('mousewheel', this.zoomOnMouseWheel.bind(this));
    }

    @HostListener('mouseleave') onMouseLeave() {
        this.removeMagnifier();
    }

    @HostListener('mousewheel') onMouseWheel() {
        // this.el.nativeElement.addEventListener('mousewheel', this.zoomOnMouseWheel.bind(this));
    }

    magnify(zoom) {
        const container = this.el.nativeElement;

        /*create magnifier glass:*/
        this.magnifyGlass = this.renderer.createElement('DIV');
        this.magnifyGlass.setAttribute('id', 'magnifier-glass');

        this.renderer.appendChild(this.el.nativeElement, this.magnifyGlass);

        this.magnifyGlass.style.backgroundImage = `url(${this.imageUrl})`;
        this.magnifyGlass.style.backgroundRepeat = 'no-repeat';
        this.magnifyGlass.style.backgroundSize = (this.img.width * zoom) + 'px ' + (this.img.height * zoom) + 'px';
        this.bw = 3;
        this.glassWidth = this.magnifyGlass.offsetWidth / 2;
        this.glassHeight = this.magnifyGlass.offsetHeight / 2;

        container.addEventListener('mousemove', this.moveMagnifier.bind(this));
        // container.addEventListener('mousemove', this.moveMagnifier.bind(this));
    }

    moveMagnifier(e) {
        let pos;
        e.preventDefault();
        pos = this.getCursorPos.bind(this)(e);
        this.coordinateX = pos.x;
        this.coordinateY = pos.y;
        if (this.coordinateY > +this.img.height || this.coordinateY < 0 || this.coordinateX > +this.img.width || this.coordinateX < 0) {
            // this.removeMagnifier();
        }
        if (this.coordinateX > this.img.width - (this.glassWidth / this.zoom)) { this.coordinateX = this.img.width - (this.glassWidth / this.zoom); }
        if (this.coordinateX < this.glassWidth / this.zoom) { this.coordinateX = this.glassWidth / this.zoom; }
        if (this.coordinateY > this.img.height - (this.glassHeight / this.zoom)) { this.coordinateY = this.img.height - (this.glassHeight / this.zoom); }
        if (this.coordinateY < this.glassHeight / this.zoom) { this.coordinateY = this.glassHeight / this.zoom; }
        this.magnifyGlass.style.left = (this.coordinateX - this.glassWidth) + 'px';
        this.magnifyGlass.style.top = (this.coordinateY - this.glassHeight) + 'px';
        this.magnifyGlass.style.backgroundPosition = '-' + ((this.coordinateX * this.zoom) - this.glassWidth + this.bw) + 'px -' + ((this.coordinateY * this.zoom) - this.glassHeight + this.bw) + 'px';
    }

    getCursorPos(e) {
        let a, x = 0, y = 0;
        e = e || window.event;
        a = this.img.getBoundingClientRect();
        x = e.pageX - a.left;
        y = e.pageY - a.top;
        x = x - window.pageXOffset;
        y = y - window.pageYOffset;
        return { x: x, y: y };
    }

    zoomOnMouseWheel(e) {
        if (e.wheelDelta) {
            setTimeout(() => {
                this.magnify(this.zoom++);
            });
        } else {
            setTimeout(() => {
                this.magnify(3);
            });
        }
    }

    removeMagnifier() {
        if (this.el.nativeElement.children[1]) {
            this.renderer.removeChild(this.el.nativeElement, this.magnifyGlass);
        }
    }
}
