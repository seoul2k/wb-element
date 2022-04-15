function insertAfter(newElement, targetElement) { // newElement是要追加的元素 targetElement 是指定元素的位置
    var parent = targetElement.parentNode; // 找到指定元素的父节点
    if( parent.lastChild == targetElement ){ // 判断指定元素的是否是节点中的最后一个位置 如果是的话就直接使用appendChild方法
        parent.appendChild( newElement, targetElement );
    }else{
        parent.insertBefore( newElement, targetElement.nextSibling );
    };
};
class WbButton extends HTMLButtonElement {
    constructor () {
        super();
        this.pd = {
            'medium':'10px 20px',
            'small':'9px 15px',
            'mini':'7px 15px',
        }
        this.color = {
            'primary':'#409eff',
            'success':'#67c23a',
            'warning':'#e6a23c',
            'danger':'#f56c6c',
            'info':'#909399',
            'text':'#409eff',
        }
        this.color2 = {
            'primary':'#66b1ff',
            'success':'#85ce61',
            'warning':'#ebb563',
            'danger':'#f78989',
            'info': '#a6a9ad',
            'text':'#66b1ff',
        }
        this.disabledColor = {
            'primary':'#a0cfff',
            'success':'#b3e19d',
            'warning':'#f3d19e',
            'danger':'#fab6b6',
            'info':'#c8c9cc',
            'text':'#c0c4cc',
        }
        this.border = {
            round: '20px',
            // default:'5px',
            plain: '5px',
            circle: '50%'
        }
        this.style.border = '1px solid'
        let Attr = ['type', 'plain','disabled','size']
        for (let i = 0; i < Attr.length; i++) {
            let attr = Attr[i];
            if (this.hasAttribute(attr)) {
                try {
                    eval('this.'+attr+'(true)')
                } catch (error) {
                    console.error(error)
                    throw 'wb-element Warn:'+error
                }
            } else {
                try {
                    eval('this.'+attr+'(false)')
                } catch (error) {
                    console.error(error)
                    throw 'wb-element Warn:'+error
                }
            }
        }
        if (this.hasAttribute('native-type')) {
            this.setAttribute('type', this.getAttribute('native-type'))
            this.removeAttribute('native-type')
        }
        if (this.getAttribute('autofocus')) {
            this.setAttribute('autofocus','autofocus')
        }
    }
    size(i) {
        if (i) {
            this.size = this.getAttribute('size')
            this.style.padding = this.pd[this.size]
        } else {
            this.style.padding = '12px 20px'
        }
    }
    type(i) {
        if (i) {
            this.leave = () => {
                if (this.type == 'text') {
                    this.style.color = this.color[this.getAttribute('type')]
                    this.style.background = 'none'
                    this.style.border = 'none'
                    this.style.borderColor = 'none'
                } else {
                    this.style.borderColor = this.color[this.getAttribute('type')]
                    this.style.background = this.color[this.getAttribute('type')]  
                }
            }
            this.enter = () => {
                if (this.type == 'text') {
                    this.style.color = this.color2[this.getAttribute('type')]
                    this.style.background = 'none'
                    this.style.border = 'none'
                    this.style.borderColor = 'none'
                } else {
                    this.style.borderColor = this.color2[this.getAttribute('type')]
                    this.style.background = this.color2[this.getAttribute('type')]
                }

            }
            this.addEventListener('mouseenter', this.enter)
            this.addEventListener('mouseleave', this.leave)
            this.type = this.getAttribute('type')
            if (this.type == 'text') {
                this.style.color = this.color[this.getAttribute('type')]
                this.style.background = 'none'
                this.style.border = 'none'
                this.style.borderColor = 'none'
            } else {
                this.style.background = this.color[this.getAttribute('type')]  
                this.style.border = '1px solid rgb(141 138 138)'
                this.style.color = 'rgb(141 138 138)'
            }

        } else {
            this.enter = () => {
                this.style.color = '#409eff'
                this.style.borderColor = '#c6e2ff'
                this.style.backgroundColor = '#ecf5ff'
            }
            this.leave = () => {
                this.style.background = '#ffffff'
                this.style.borderColor = 'rgb(141 138 138)'
                this.style.color = 'rgb(141 138 138)'
            }
            this.type = 'default'
            this.style.background = '#ffffff'
            this.addEventListener('mouseenter', this.enter)
            this.addEventListener('mouseleave', this.leave)
        }
    }
    disabled(i) {
        if (i) {
            this.style.cursor = 'not-allowed'
            this.removeEventListener('mouseleave',this.leave)
            this.removeEventListener('mouseenter',this.enter)
            if (this.type != 'default') {
                if (this.type == 'text')this.style.color = this.disabledColor[this.type]
                else {
                    this.style.color = '#fff'
                    this.style.backgroundColor = this.disabledColor[this.type]
                    this.style.borderColor = this.disabledColor[this.type]
                }

            } else {
                this.style.color = '#c0c4cc'
                this.style.backgroundColor = '#fff'
                this.style.borderColor = '#ebeef5'
            }
        }
    }
    loading() {
        this.loading = this.getAttribute('loading')
        if ((this.loading) || (this.hasAttribute('loading') && this.loading == '')) {
            var i = document.createElement('i')
            i.classList.add('wb-icon-loading')
            this.insertBefore(i,this.children[0])
        }
    }
    plain(i) {
        if (i) {
            this.style.borderRadius = this.border.plain
            // this.style.background = 'non'
        }
        else {
            let Attr1 = ['round', 'circle','loading','icon','native-type','autofocus']
            this.style.borderRadius = this.border.plain
            for (let i = 0; i < Attr1.length; i++) {
                let attr = Attr1[i];
                if (this.hasAttribute(attr)) {
                    try {
                        if (attr == 'native-type') {
                            attr = 'native_type'
                        }
                        eval('this.'+attr+'()')
                    } catch (error) {
                        console.error(error)
                        throw 'wb-element Warn:'+error
                    }
                }
            }
        }
    }
    autofocus() {
        if (this.getAttribute('autofocus')) {
            this.setAttribute('autofocus','autofocus')
        }
    }
    native_type(){
        this.setAttribute('type',this.getAttribute('native-type'))
        // this.removeAttribute('native-type')
        console.log('1');
    }
    icon() {
        this.innerHTML = '<i class="'+this.getAttribute('icon')+'"></i>'+this.innerHTML
    }
    round() {
        this.style.borderRadius = this.border.round
    }
    circle() {
        this.style.borderRadius = this.border.circle
    }
}
class webButton extends HTMLElement{
    constructor() {
        super()
        var s = '<button is="web-button" '
        var array = ['size','type','plain','round','circle','loading','disabled','native-type','icon','autofocus']
        for (let i = 0; i < array.length; i++) {
            const element = array[i];
            if (this.hasAttribute(element)) {
                s = s + element + '="' + this.getAttribute(element) + '" '
                this.removeAttribute(element)
            }
        }
        this.innerHTML = s+'>'+this.innerHTML+'</button>'
    }
}
class WebPageHeader extends HTMLElement{
    constructor() {
        super()
        this.style.display = 'flex'
        var div = document.createElement('div')
        div.classList.add('wb-page-header__left')
        var i = document.createElement('i')
        i.classList.add('wb-icon-back')
        var divinner = document.createElement('div')
        divinner.classList.add('wb-page-header__title')
        divinner.innerHTML = this.hasAttribute('title')?this.getAttribute('title'):'返回'
        var divc = document.createElement('div')
        divc.classList.add('wb-page-header__content')
        if (this.hasAttribute('back')) {
            this.onclick = function () {
                eval(this.getAttribute('back'))
            }
        }
        if (this.hasAttribute('content')) {
            divc.innerHTML = this.getAttribute('content')
        }
        div.appendChild(i)
        div.appendChild(divinner)
        this.appendChild(div)
        this.appendChild(divc)
    }
}
customElements.define('web-button', WbButton, {
    extends: 'button'
})
customElements.define('wb-button', webButton)
customElements.define('wb-page-header', WebPageHeader)