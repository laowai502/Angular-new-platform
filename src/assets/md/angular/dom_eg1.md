``` typescript
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
```
