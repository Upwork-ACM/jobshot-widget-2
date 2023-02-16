import React, { useEffect, useState } from 'react';
import { Styled } from 'direflow-component';
import { Select, CaretIcon, ModalCloseButton } from 'react-responsive-select';
import EllipsisText from "react-ellipsis-text"
import axios from 'axios'
import Pagination from 'rc-pagination'
import Modal from 'react-modal';
import Carousel from 'react-grid-carousel'
import ImageViewer from 'awesome-image-viewer'
import styles from './App.css';
import 'react-responsive-select/dist/react-responsive-select.css'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    width: '80%',
    height: '70%',
    transform: 'translate(-50%, -50%)',
    fontFamily: 'Noto Sans JP'
  },
};

const App = (props) => {
  
  const [projects, setProjects] = useState([])
  const [selection, setSelection] = useState([])
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [serviceType, setServiceType] = useState([])
  const [modalIsOpen, setIsOpen] = useState(false);

  const [data, setData] = useState(null)

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }


  useEffect(() => {
    axios.get(`http://localhost:9000/api/v1/projects/${props.dataId}?page=${page}&search=${search}&serviceType=${serviceType}`)
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
      axios.get(`http://localhost:9000/api/v1/users/${props.dataId}`)
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
  }, [props, page, search, serviceType])


  return (
    <Styled styles={styles}>
      <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 style={{ textAlign: 'center', fontWeight: 'bold' }}>{data?.title.toUpperCase()}</h2>
        <h4 style={{ textAlign: 'center' }}>{data?.description}</h4>
        <div style={{ textAlign: 'center' }}>
          <button style={{ backgroundColor: 'white', borderColor: 'black', padding: '10px' }}>REQUEST QUOTE</button>
        </div>
        <div style={{ backgroundColor: 'black', width: '100%'}}>
          <h4 style={{ color: 'white', paddingLeft: '20px', paddingTop: '10px', paddingBottom: '10px', fontWeight: 'bold' }}>BEFORE</h4>
        </div>
        {
          data && data.project.length > 0 &&
          <Carousel cols={5} style={{ width: '100%'}} rows={1} gap={5} loop>
            {
              data.beforeFiles.map((x, i) => {
                return <Carousel.Item>
                  <img alt={i} onClick={ async () => {
                    new ImageViewer({
                      images: data.beforeFiles,
                      showThumbnails: false
                    })
                  }} width="200px" src={x.mainUrl} />
                </Carousel.Item>
              })
            }
          </Carousel>
        }
        <div style={{ backgroundColor: 'black', width: '100%'}}>
          <h4 style={{ color: 'white', paddingLeft: '20px', paddingTop: '10px', paddingBottom: '10px', fontWeight: 'bold' }}>PROGRESS</h4>
        </div>
        {
          data && data.project.length > 0 &&
          <Carousel cols={5} style={{ width: '100%'}} rows={1} gap={5} loop>
            {
              data.progressFiles.map((x, i) => {
                return <Carousel.Item>
                  <img alt={i} onClick={ async () => {
                    new ImageViewer({
                      images: data.progressFiles,
                      showThumbnails: false
                    })
                  }} width="200px" src={x.mainUrl} />
                </Carousel.Item>
              })
            }
          </Carousel>
        }
        <div style={{ backgroundColor: 'black', width: '100%'}}>
          <h4 style={{ color: 'white', paddingLeft: '20px', paddingTop: '10px', paddingBottom: '10px', fontWeight: 'bold' }}>AFTER</h4>
        </div>
        {
          data && data.project.length > 0 &&
          <Carousel cols={5} style={{ width: '100%'}} rows={1} gap={5} loop>
            {
              data.afterFiles.map((x, i) => {
                return <Carousel.Item>
                  <img alt={i} onClick={ async () => {
                    new ImageViewer({
                      images: data.afterFiles,
                      showThumbnails: false
                    })
                  }} width="200px" src={x.mainUrl} />
                </Carousel.Item>
              })
            }
          </Carousel>
        }
      </Modal>
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
                    onSelect={(a) => a.value === 'all' ? setServiceType([]) : setServiceType(oldArray => [...oldArray, a.value])}
                    onDeselect={(a) => {
                      const temp = []
                      for(let i = 0; i < serviceType.length; i++) {
                        if(serviceType[i] !== a.value) {
                          temp.push(serviceType[i])
                        }
                      }
                      setServiceType(temp)
                    }}
                  />
                </div>
              </div>
            }
            {console.log(serviceType)}
            <div className="input-field second-wrap">
              <input id="search" type="text" onChange={(a) => setSearch(a.target.value)} placeholder="Enter Keywords?" />
            </div>
          </div>
        </form>
      </div>
      <div className="wrapper">
          <ul className="row" style={{ marginLeft: '-13px'}}>
            {
              projects.map((x, i) => {
                return (
                  <li className="block" key={i} onClick={() => {
                    const beforeFiles = []
                      const progressFiles = []
                      const afterFiles = []
                      for(let i = 0; i < x.project.length; i++) {
                        if(x.project[i].type === 'before') {
                          beforeFiles.push({mainUrl: x.project[i].file})
                        }
                        if(x.project[i].type === 'progress') {
                          progressFiles.push({mainUrl: x.project[i].file})
                        }
                        if(x.project[i].type === 'after') {
                          afterFiles.push({mainUrl: x.project[i].file})
                        }
                      }
                      const temp = x
                      temp.beforeFiles = beforeFiles
                      temp.progressFiles = progressFiles
                      temp.afterFiles = afterFiles
                      console.log(temp)
                      setData(temp);
                    openModal();
                  }} hidden={modalIsOpen ? true : false}>
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
          <Pagination defaultPageSize={1} total={projects?.totalPages || 0} onChange={(a) => setPage(a)} />
        </div>
      </div>
    </Styled>
  );
};

export default App;
