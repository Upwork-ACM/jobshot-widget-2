/* eslint-disable react/jsx-key */
/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from 'react'
import { Styled } from 'direflow-component';
import axios from 'axios'
import LazyLoad from 'react-lazyload'
import styles from './index.css'
import 'react-responsive-select/dist/react-responsive-select.css'
import closeButton from './img_211963.png'

const App = (props) => {
  const [projects, setProjects] = useState([])
  const [HasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1)

  const test = async () => {
    await axios.get(`https://jobshot.app/api/v1/projects/widget/${props.dataId}?page=${page}`)
    .then(function (response) {
      if(response && response.data) {
        const temp = response.data.data
        setTotalPage(temp.totalPage)
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
        setProjects((prevProjects) => {
          return [...new Set([...prevProjects, ...arr])];
        });
        setHasMore(page + 1 === response.data.totalPages);
        setPage((prevPageNumber) => prevPageNumber + 1);
      } else {
        setProjects([])
      }
    })
    await axios.get(`https://jobshot.app/api/v1/users/${props.dataId}`)
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
      }
    })
  }
  useEffect(() => {
    test()
  }, [])
  const [visible, setVisible] = useState(true)
  const [visibleQuote, setVisibleQuote] = useState(false)
  const [data, setData] = useState(null)
  return (
    <Styled styles={styles}>
      <div>
        {
          visible && !visibleQuote && <div className="wrapper">
          <div>
            <h2 style={{ textTransform: 'uppercase' }}>Loremn Ipsum is simply dummy</h2>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
          </div>
          {
            projects && projects.map((a, i) => {
              return (
                
                  <figure className="snip1218" key={i} onClick={() => {
                    setData(a)
                    setVisible(false)
                  }}>
                    <LazyLoad>
                      <div className="image"><img src={a.after.length > 0  && a.after[0]} alt="sample79"/>
                      </div>
                      <figcaption>
                        <h3>{a.title}</h3>
                        <h5 style={{
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          display: '-webkit-box',
                          lineClamp: 3,
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: 'vertical'
                        }}>{a.description}</h5>
                        <hr style={{
                          // position: 'absolute',
                          textAlign: 'center',
                          marginBottom: '-1px',
                          width: '50%',
                          border: '2px solid #02156b'
                        }} />
                      </figcaption>
                    </LazyLoad>
                  </figure>
              )
            })
          }
          {totalPage !== page && HasMore && (
            <div style={{ width: '100%'}}>
              <button onClick={test} className="button-6" role="button">LOAD MORE</button>
            </div>
          )}
        </div>
        }
        {
          data && !visibleQuote && <div>
          <div style={{ float: 'right', marginRight: '40px' }}>
            <img src={closeButton} style={{ width: '40px' }} onClick={() => {
                setData(null)
                setVisibleQuote(false)
                setVisible(true)
              }}  />
          </div>
          <div>
            <h1 style={{ textTransform: 'uppercase', color: '#02156b' }}>{data && data.title}</h1>
            <p>{data && data.description}</p>
          </div>
          <div>
            <div style={{ width: '100%'}}>
              <button className="button-6" role="button" onClick={() => setVisibleQuote(true)}>GET A QUOTE</button>
            </div>
          </div>
          <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h2 style={{ color: '#02156b', padding: '10px', backgroundColor: '#F0F0F0', marginLeft: '25%', marginRight: '25%', textAlign: 'center' }}>BEFORE IMAGES</h2>
            <div style={{ padding: '50px'}}>
              {data && data.before && data.before.map((x) => {
                return <img src={x} style={{ width: '200px', padding: '10px' }} />
              })}
            </div>
          </div>
          <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h2 style={{ color: 'white', padding: '10px', backgroundColor: '#02156b', marginLeft: '25%', marginRight: '25%', textAlign: 'center' }}>PROGRESS IMAGES</h2>
            <div style={{ padding: '50px'}}>
              {data && data.progress && data.progress.map((x) => {
                return <img src={x} style={{ width: '200px', padding: '10px' }} />
              })}
            </div>
          </div>
          <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h2 style={{ color: '#02156b', padding: '10px', backgroundColor: '#F0F0F0', marginLeft: '25%', marginRight: '25%', textAlign: 'center' }}>AFTER IMAGES</h2>
            <div style={{ padding: '50px'}}>
              {data && data.after && data.after.map((x) => {
                return <img src={x} style={{ width: '200px', padding: '10px' }} />
              })}
            </div>
          </div>
        </div>
        }
        {
          visibleQuote &&
          <div>
            <div style={{ float: 'right', marginRight: '40px', marginTop: '20px' }}>
              <img src={closeButton} style={{ width: '40px' }} onClick={() => {
                setVisibleQuote(false)
                setData(null)
                setVisible(true)
              }} />
            </div>
            <div className="container">
              <div className="layout">
                <div className="col col-main">
                  <form>
                    <input type="text" placeholder='Full Name' />
                    <input type="text" placeholder='Phone Number' />
                    <input type="email" placeholder='Email' />
                    <textarea type="textarea" placeholder='Message' />
                    <button type="submit">SUBMIT</button>
                    
                  </form>
                </div>
                <div className="col col-complementary" role="complementary" style={{ backgroundColor: '#02156b', color: 'white ' }}>
                  <div className="box">
                    <span style={{ width: '100%'}}>WE ARE EXCITED TO HELP! <br /><p style={{ color: 'white', fontSize: '16px', fontWeight: 'initial' }}>Please fill in the details beside so we can reach out and schedule a time to offer you the same amazing experience you have seen in our customer project page.</p></span>
                  </div>
                </div>  
              </div>   
            </div>
          </div>
        }
      </div>
    </Styled>
  );
};

export default App;
