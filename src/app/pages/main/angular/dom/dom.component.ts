import { Component, OnInit, AfterViewInit, ViewChild, ViewContainerRef, ComponentRef, ElementRef, Renderer2} from '@angular/core';

import $ from 'jquery';

import { DomChildComponent } from './domChild';

import { slideDown, slideUp } from '../../../../util';

const mockData = [
    { id: 1, pId: 0, name: 'group-1', hasChild: true, isOpen: true },
    { id: 11, pId: 1, name: 'group-1-sub-1', hasChild: true, isOpen: false },
    { id: 111, pId: 11, name: 'Image', hasChild: false, isOpen: false },
    { id: 112, pId: 11, name: 'group-1-sub-1-sub', hasChild: true, isOpen: false },
    { id: 1121, pId: 112, name: 'Image', hasChild: false, isOpen: false },
    { id: 1122, pId: 112, name: 'Image', hasChild: false, isOpen: false },
    { id: 12, pId: 1, name: 'group-1-sub-2', hasChild: true, isOpen: false },
    { id: 121, pId: 12, name: 'Image', hasChild: false, isOpen: false },
    { id: 122, pId: 12, name: 'Image', hasChild: false, isOpen: false },
    { id: 13, pId: 1, name: 'Image', hasChild: false, isOpen: false },
    { id: 2, pId: 0, name: 'group-2', hasChild: true, isOpen: false },
    { id: 21, pId: 2, name: 'Image', hasChild: false, isOpen: false },
    { id: 22, pId: 2, name: 'Image', hasChild: false, isOpen: false },
    { id: 3, pId: 0, name: 'group-3', hasChild: true, isOpen: false },
    // { id: 31, pId: 3, name: 'Image', hasChild: false, isOpen: false },
    // { id: 32, pId: 3, name: 'Image', hasChild: false, isOpen: false },
    { id: 4, pId: 0, name: 'group-4', hasChild: true, isOpen: false },
    { id: 41, pId: 4, name: 'group-4-sub', hasChild: true, isOpen: false },
    { id: 411, pId: 41, name: 'Image', hasChild: false, isOpen: false },
    { id: 412, pId: 41, name: 'Image', hasChild: false, isOpen: false },
    { id: 42, pId: 4, name: 'Image', hasChild: false, isOpen: false },
    { id: 43, pId: 4, name: 'Image', hasChild: false, isOpen: false }
];

@Component({
    selector: 'app-dom',
    templateUrl: './dom.component.html',
    styleUrls: ['./dom.component.scss', '../../../../themes/markdown.scss']
})
export class DomComponent implements OnInit, AfterViewInit {

    treeData: any;

    fatherString = '组件变量';

    @ViewChild('AngularDom', { static: false }) AngularDom: ElementRef;
    @ViewChild(DomChildComponent, { static: false }) DomChild: DomChildComponent;

    constructor(
        private render: Renderer2,
        private el: ElementRef
    ) {}

    ngOnInit() {
        this.treeData = this.treeDataParse(mockData, 0);
        // console.log(this.el);
        // debugger;
    }

    ngAfterViewInit() {
        console.log(this.el);
        this.showJQuery();
        this.showAngular();
    }

    treeDataParse(list: Array<any>, pId: number) { // recurrence data
        const res = [];
        let temp;
        list.forEach((item, i) => {
            if (item.pId === pId) {
                res.push(item);
                temp = this.treeDataParse(list, item.id);
                if (temp.length > 0) {
                    item.children = temp;
                }
            }
        });
        return res;
    }

    renderDom(data, pId) {
        if (Array.isArray(data) && data.length > 0) {
            let html = pId === 0 ? '' : '<ul>';
            data.forEach((item) => {
                let li;
                if (item.hasChild) {
                    const Random = new Date().getTime();
                    li = `
                        <li class="has-children">
                            <input type="checkbox" name ="${item.name + Random}"
                                    id="${item.name + Random}" ${item.isOpen ? 'checked' : ''}>
                            <label for="${item.name + Random}">${item.name}</label>
                    `;
                    if (Array.isArray(item.children) && item.children.length > 0) {
                        li += this.renderDom(item.children, item.id);
                    }
                    li += '</li>';
                } else {
                    li = '<li><a href="javascript:void(0);">Image</a></li>';
                }
                html += li;
            });
            return html + (pId === 0 ? '' : '</ul>');
        } else {
            return '';
        }
    }

    showJQuery() {
        const accordionsMenu = $('#JQueryDom');

        accordionsMenu.append(this.renderDom(this.treeData, 0));

        if (accordionsMenu) {
            accordionsMenu.on('change', 'li input[type="checkbox"]', function() {
                const checkbox = $(this);
                console.log(checkbox.prop('checked'));
                ( checkbox.prop('checked') ) ?
                   checkbox.siblings('ul').attr('style', 'display:none;').slideDown(300)
                 : checkbox.siblings('ul').attr('style', 'display:block;').slideUp(300);
            });
        }
    }

    showAngular() {
        const dom = this.render.createElement('ul');
        dom.className = 'cd-accordion-menu';
        dom.innerHTML = this.renderDom(this.treeData, 0);
        // console.log(dom instanceof Node);
        this.render.appendChild(this.AngularDom.nativeElement, dom);

        this.render.listen(dom, 'click', (e) => {
            const checkbox = e.target;
            if (checkbox instanceof Object && checkbox.type === 'checkbox') {
                const siblings = checkbox.parentNode.children;
                for (const item of siblings) {
                    if (item.tagName === 'UL') {
                        if (checkbox.checked) {
                            this.render.setStyle(item, 'display', 'none');
                            slideDown(item, 300);
                        } else {
                            this.render.setStyle(item, 'display', 'block');
                            slideUp(item, 300);
                        }
                    }
                }
            }
        });
    }

}
