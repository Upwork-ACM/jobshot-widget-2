import { DireflowComponent } from 'direflow-component';
import App from './App';

const component = document.querySelector('widget-component');
console.log('component main', component)
console.log('component main', component.getAttribute('data-id'))
console.log('component main 1', component.getAttribute('id'))
console.log('component main 2', component.getAttribute('question'))

export default DireflowComponent.create({
  component: App,
  configuration: {
    tagname: 'widget-component'
  },
  plugins: [
    {
      name: 'font-loader',
      options: {
        google: {
          families: ['Advent Pro', 'Noto Sans JP'],
        },
      },
    },
  ],
});
