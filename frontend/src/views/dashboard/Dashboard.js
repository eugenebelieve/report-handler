import React, { useState, useEffect } from 'react';


import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCol,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CWidgetStatsC,
  CWidgetStatsF,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilHappy,
  cilSpeech,
  cilLowVision,
  cilInstitution,
  cilX,
  cilCheck,
} from '@coreui/icons'

const axios = require('axios').default;



const Dashboard = () => {

  const [data, setData] = useState(null);
  
  async function getReports(){
    try{
      const { data } = await axios.get("http://localhost:8000/reports",{headers: {'Access-Control-Allow-Origin': true}});
      setData(data.elements)
    }catch(err){
      console.log(err);
      return <div>Reload page please</div>;
    }
  }

  
  async function updateReport(id, stateObj){
    try{
      const { data } = await axios.put("http://localhost:8000/reports/"+id,stateObj,{headers: {'Access-Control-Allow-Origin': true}});
      setData(data.elements);
    }catch(err){
      console.log(err);
      return <div>Reload page please</div>;
    }
  }
  
  useEffect(() => {
    getReports();
  }, [setData]);

  const progressExample = [
    { title: 'SPAM', value: data && data.filter(x=>x.payload.reportType === "SPAM").length, percent: (data && data.filter(x=>x.payload.reportType === "SPAM").length/data.length*100), color: 'danger' },
    { title: 'INFRINGES PROPERTY', value: data && data.filter(x=>x.payload.reportType === "INFRINGES_PROPERTY").length, percent: (data && data.filter(x=>x.payload.reportType === "INFRINGES_PROPERTY").length/data.length*100), color: 'info' },
    { title: 'VIOLATES POLICIES', value: data && data.filter(x=>x.payload.reportType === "VIOLATES_POLICIES").length, percent: (data && data.filter(x=>x.payload.reportType === "VIOLATES_POLICIES").length/data.length*100), color: 'warning' },

  ]

  if (!data) return <div>Loading data from API...</div>;
  
  return (
    <>
      
      <CRow>
        <CCol sm={6} lg={6}>
        <CWidgetStatsC
                color="danger"
                icon={<CIcon icon={cilBell} height={50} />}
                value={data.length}
                title="Unresolved"
                inverse
                progress={{ value: data?.length/25*100 }}
                className="mb-4"
              />
        </CCol>
        <CCol sm={6} lg={6}>
        <CWidgetStatsC
                color="info"
                icon={<CIcon icon={cilHappy} height={50} />}
                value={25-data.length}
                title="Resolved"
                inverse
                progress={{ value: (25-data?.length)/25*100 }}
                className="mb-4"
              />
        </CCol>
      </CRow>

      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            <CCol sm={5}>
              <h4 id="traffic" className="card-title mb-2">
                List of Reports
                
              </h4>
            </CCol>
          </CRow>

          <CRow>
            <CCol>
              <CTable align="middle" className="mb-0 border" hover responsive>
                  <CTableHead color="light">
                    <CTableRow>
                      <CTableHeaderCell className="text-center">
                        <CIcon icon={cilBell} /> Type
                      </CTableHeaderCell>
                      <CTableHeaderCell>Report</CTableHeaderCell>
                      <CTableHeaderCell>Message</CTableHeaderCell>
                      <CTableHeaderCell className="text-center">More</CTableHeaderCell>
                      <CTableHeaderCell className="text-center">Action</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>

                  <CTableBody>
                    {data && data.map((item, index) => (
                      <CTableRow v-for="item in tableItems" key={index}>
                        <CTableDataCell className="text-center">
                        <CWidgetStatsF
                          className=""
                          color={item?.payload?.reportType === "SPAM" ? "danger" : item?.payload?.reportType === "VIOLATES_POLICIES" ? "dark" : "warning" }
                          icon={item?.payload?.reportType === "SPAM" ? <CIcon icon={cilBell} height={24} /> : item?.payload?.reportType === "VIOLATES_POLICIES" ? <CIcon icon={cilInstitution} height={24} /> : <CIcon icon={cilLowVision} height={24} />}
                          title={item?.payload?.reportType.substring(0, 7)}
                          padding={false}
                          />
                        </CTableDataCell>

                        <CTableDataCell>
                          <div>{item.payload.referenceResourceType}</div>
                          <div className="small text-medium-emphasis">
                            <span>State : {item.state}</span> 
                          </div>
                        </CTableDataCell>
                        
                        
                        
                        <CTableDataCell>
                          
                          <div className="clearfix">
                            <div className="">
                              <strong>ID : {item?.id}</strong>
                            </div>
                            <div className="">
                              <small className="text-medium-emphasis"><CIcon icon={cilSpeech} height={15} /> {item.payload.message ? item.payload.message : "No Message"}</small>
                            </div>
                          </div>
                            
                        </CTableDataCell>

                        <CTableDataCell className="text-center">
                          <CButton color="link" shape="rounded-0">Details</CButton>
                        </CTableDataCell>

                        <CTableDataCell>
                          <div className="text-center">
                            <CButton color="success" style={{color:'white'}} className='m-1' onClick={()=>updateReport(item.id, {state:"RESOLVE"})} ><CIcon icon={cilCheck} className="me-1" />Resolve</CButton>
                            <CButton color="danger" style={{color:'white'}} className='m-1' onClick={()=>updateReport(item.id, {state:"BLOCK"})} ><CIcon icon={cilX} className="me-1" />Block</CButton>
                          </div>
                        </CTableDataCell>
                      </CTableRow>
                    ))}
                  </CTableBody>
              </CTable>
            </CCol>
          </CRow>
        </CCardBody>
        
        <CCardFooter>
          <CRow xs={{ cols: 1 }} md={{ cols: 3 }} className="text-center">
            {progressExample.map((item, index) => (
              <CCol className="mb-sm-2 mb-0" key={index}>
                <div className="text-medium-emphasis">{item.title}</div>
                <strong>
                  {item.value} ({item?.percent?.toFixed(0)}%)
                </strong>
                <CProgress thin className="mt-2" color={item.color} value={item.percent} />
              </CCol>
            ))}
          </CRow>
        </CCardFooter>
      </CCard>
      
    </>
  )
}

export default Dashboard
