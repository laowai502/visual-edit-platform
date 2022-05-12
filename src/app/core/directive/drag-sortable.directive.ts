import { Directive, ElementRef, Input, Output, EventEmitter, HostListener } from '@angular/core';

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[drag-sortable]'
})
export class DragSortableDirective {

	private options: any;

	private list;  // the whole list
	private item; // current list item
	private items;

	private itemHeight;
	private startTouchY;
	private startTop;

	private itemsPostionData; // record items' transform and offsetHeight

	private movePosition; // the position when move
	private positions;

	private animation; // Not processed during animation

	@Input()
	public set opts(val: any) {
		if (val) {
			this.options = Object.assign(this.options, val);
		}
	}

	@Input() public position: number;

	@Output()
    public DragSortEmitter: EventEmitter<boolean> = new EventEmitter();

    constructor(
		// tslint:disable-next-line:variable-name
		private _elementRef: ElementRef
	) {
		this.options = {
			backgroundColor: '#f1f1f1',
			// border: 'dashed 1px #1438b7',
			animationSpeed: 200,
			animationEasing: 'ease-out',
		};

		this.animation = false;

		this.dragMove = this.dragMove.bind(this);
		this.dragStart = this.dragStart.bind(this);
		this.dragEnd = this.dragEnd.bind(this);

		_elementRef.nativeElement.addEventListener('mousedown', this.dragStart , false);
	}

	dragStart(e) {
		e.stopPropagation();

		if (this.animation) { return; }

		let el = e.target;
		while (el) {
			if (el.hasAttribute('sortable-item')) { this.item = el; }
			if (el.hasAttribute('sortable-list')) { this.list = el; break; }
			el = el.parentElement;
		}

		if (!this.item || !this.list) {
			return;
		}

		this.items = Array.from(this.list.children);

		this.list.style.position = 'relative';
		this.list.style.height = this.list.offsetHeight + 'px';

		this.item.classList.add('is-dragging');

		this.itemHeight = this.item.offsetHeight;
		this.startTop = this.item.offsetTop;
		this.startTouchY = e.pageY;

		const offsetsTop = this.items.map(item => item.offsetTop);

		this.items.forEach((item, index) => {
			item.style.backgroundColor = this.options.backgroundColor;
			// item.style.border = this.options.border;
			item.style.position = 'absolute';
			item.style.top = 0;
			item.style.left = 0;
			item.style.width = '100%';
			item.style.transform = `translateY(${offsetsTop[index]}px)`;
			item.style.zIndex = (item === this.item) ? 2 : 1;
		});

		setTimeout(() => {
			this.items.forEach(item => {
				if (this.item === item) { return; }
				item.style.transition = `transform ${this.options.animationSpeed}ms ${this.options.animationEasing}`;
			});
		});

		this.itemsPostionData = this.items.map(o => {
			return {
				top: Number(o.style.transform.replace(/[^0-9]/ig, '')),
				he: o.offsetHeight
			};
		});

		this.positions = this.items.map((o, i) => i);
		this.movePosition = this.position;

		window.addEventListener('mousemove', this.dragMove, { passive: false });
		window.addEventListener('mouseup', this.dragEnd, false);
	}

	dragMove(e) {
		if (this.animation) { return; }

		let top = this.startTop + e.pageY - this.startTouchY;
		let newPostions = this.itemsPostionData.findIndex(o => {
			return top + this.itemHeight < o.top + 0.75 * o.he;
		});
		if (newPostions !== -1) { // handle position Boundary value
			newPostions -= 1;
		} else {
			newPostions = this.itemsPostionData.length - 1;
		}

		if (top < 1.25 * -this.itemHeight) { // handle pos Boundary value
			top = 1.25 * -this.itemHeight;
		} else if (top > this.itemsPostionData[this.itemsPostionData.length - 1].top + 1.25 * this.itemsPostionData[this.itemsPostionData.length - 1].he) {
			top = this.itemsPostionData[this.itemsPostionData.length - 1].top + 1.25 * this.itemsPostionData[this.itemsPostionData.length - 1].he;
		}
		this.item.style.transform = `translateY(${top}px)`;
		this.positions.forEach(idx => {
			if (idx === this.movePosition || idx !== newPostions) { return; }
			this.swapElements(this.positions, this.movePosition, idx);
			this.movePosition = idx;
		});
		let flag;
		if (this.position < newPostions) {
			flag = 'down';
		} else if (this.position > newPostions) {
			flag = 'up';
		}

		this.items.forEach((o, i) => {
			if (o === this.item) { return; }
			if ((i > this.position && i <= newPostions) ||
				(i < this.position && i >= newPostions)
			) {
				o.style.transform = `translateY(${ flag === 'down' ? this.itemsPostionData[i - 1].top : this.itemsPostionData[i + 1].top }px)`;
			} else {
				o.style.transform = `translateY(${this.itemsPostionData[i].top}px)`;
			}
		});
		e.preventDefault();
	}

	dragEnd(e) {
		this.animation = true;

		this.item.style.transition = `all ${this.options.animationSpeed}ms ${this.options.animationEasing}`;
		this.item.style.transform = `translateY(${this.itemsPostionData[this.movePosition].top}px)`;
		this.item.classList.remove('is-dragging');

		setTimeout(() => {
			this.DragSortEmitter.emit(this.movePosition);
		});

		setTimeout(() => {
			this.list.style.position = '';
			this.list.style.height = '';
			this.items.forEach(o => {
				o.style.backgroundColor = '';
				// o.style.border = '';
				o.style.top = '';
				o.style.left = '';
				o.style.right = '';
				o.style.position = '';
				o.style.transform = '';
				o.style.transition = '';
				o.style.width = '';
				o.style.zIndex = '';
			});
			this.animation = false;
			this.clearData();
		}, this.options.animationSpeed);

		window.removeEventListener('mousemove', this.dragMove, false);
		window.removeEventListener('mouseup', this.dragEnd, false);
	}

	swapElements(array, a, b) {
		const temp = array[a];
		array[a] = array[b];
		array[b] = temp;
	}

	clearData() {
		this.list = this.item = this.items = null;
		this.itemHeight = this.startTouchY = this.startTop = null;
		this.itemsPostionData = this.movePosition = null;
	}

}
