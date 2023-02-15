import React, { useEffect, useState } from 'react';
import { Styled } from 'direflow-component';
import { Select, CaretIcon, ModalCloseButton } from 'react-responsive-select';
import EllipsisText from "react-ellipsis-text"
import axios from 'axios'
import Pagination from 'rc-pagination'
import styles from './App.css';
import 'react-responsive-select/dist/react-responsive-select.css'

const App = (props) => {
  
  const [projects, setProjects] = useState([])
  const [selection, setSelection] = useState([])

  useEffect(() => {
    axios.get(`https://jobshot.app/api/v1/projects/${props.dataId}`)
      .then(function (response) {
        // console.log(response);
        if(response && response.data) {
          const temp = response.data.data
          const arr = []
          for(let i = 0; i < temp.length; i++) {
            const before = []
            const progress = []
            const after = []
            const temp2 = temp[i]
            for(let a = 0; a < temp[i].project.length; a++) {
              if(temp[i].project[a].type === 'before'){
                before.push(temp[i].project[a].file)
              }
              if(temp[i].project[a].type === 'progress'){
                progress.push(temp[i].project[a].file)
              }
              if(temp[i].project[a].type === 'after'){
                after.push(temp[i].project[a].file)
              }
            }
            temp2.before = before
            temp2.progress = progress
            temp2.after = after
            arr.push(temp2)
          }
          setProjects(arr)
        } else {
          setProjects([])
        }
      })
      axios.get(`https://jobshot.app/api/v1/users/${props.dataId}`)
      .then(function (response) {
        if(response.data) {
          const temp = []
          for(let i = 0; i < response.data.services.length; i++) {
            if(i === 0) {
              temp.push({
                value: 'all',
                text: 'All',
                // markup: <MultiSelectOptionMarkup text="All" />,
              })
            }
            temp.push({
              value: response.data.services[i],
              text: response.data.services[i],
              // // markup: <MultiSelectOptionMarkup text={response.data.services[i]} />,
            })
          }
          // console.log(temp)
          setSelection(temp)
        }
      })
  }, [props])


  return (
    <Styled styles={styles}>
      <div>
      <div className="s003">
        <form>
          <div className="inner-form">
            {
              selection.length > 0 && 
              <div className="input-field first-wrap">
                <div className="input-select" style={{ marginTop: '4px', border: 0 }}>
                  <Select
                    multiselect={true}
                    selectedValues={[]}
                    modalCloseButton={<ModalCloseButton />}
                    border={0}
                    style={{ border: 0 }}
                    options={selection}
                    caretIcon={<CaretIcon />}
                    onChange={(...rest) => console.log(rest)}
                    onSubmit={(a) => console.log('onSubmit', a)}
                  />
                </div>
              </div>
            }
            <div className="input-field second-wrap">
              <input id="search" type="text" placeholder="Enter Keywords?" />
            </div>
            <div className="input-field third-wrap">
              <button className="btn-search" type="button">
                <svg className="svg-inline--fa fa-search fa-w-16" aria-hidden="true" data-prefix="fas" data-icon="search" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path fill="currentColor" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
                </svg>
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className="wrapper">
          <ul className="row" style={{ marginLeft: '-13px'}}>
            {
              projects.map((x, i) => {
                return (
                  <li className="block" key={i}>
                    <img src={x.after.length > 0 ? x.after[0] : x.before[0]} className="card__image" alt="" />
                    <div className="card__overlay">
                      <div className="card__header">
                        <div className="card__header-text">
                          <h3 className="card__title">{x.title}</h3>
                          <span className="card__status">{x.serviceType}</span>
                        </div>
                      </div>
                      <p className="card__description"><EllipsisText text={x.description} length={80} /></p>
                    </div>
                  </li>
                )
              })
            }
          </ul>
        </div>
        <div style={{ textAlign: 'center', marginTop: '4em' }}>
          <Pagination defaultPageSize={10} />
        </div>
      </div>
    </Styled>
  );
};

export default App;
