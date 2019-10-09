``` typescript
showAngular() { // constructor(private render: Renderer2) {}
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
```
