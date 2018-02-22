import _ from 'lodash';
import './index.scss';

function component() {
    var element = document.createElement('div');

    element.innerHTML = _.join(['Hello', 'webpack'], ' ');

    return element;
}

var element = document.createElement('button');
element.className = 'btn btn-primary';
element.innerText = 'Button';
document.body.appendChild(element);
document.body.appendChild(component());
