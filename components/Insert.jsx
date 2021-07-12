import { useState, useEffect } from 'react';
import { Button, Checkbox, Form, Container, Select, Input, TextArea } from 'semantic-ui-react'
import rp from 'request-promise';

const FormExampleForm = () => {
  const [provinsiSource, setProvinsiData] = useState([]);
  const [kotaSource, setKotaData] = useState([]);

  const [provinsi, setProvinsi] = useState(null);
  const [kota, setKota] = useState(null);
  const [storeName, setStoreName] = useState(null);
  const [address, setAddress] = useState(null);
  const [website, setWebsite] = useState(null);
  const [phone, setPhone] = useState(null);
  const [wa, setWA] = useState(null);
  const [categories, setCategories] = useState([
    'Penyewaan', 'Pembelian', 'Isi ulang'
  ]);

  const submitData = (e) => {
    const baseURI = process.env.NODE_ENV === 'production' ? 'https://info-tabung-oksigen.vercel.app' : 'http://localhost:5000';
    const data = {
      store_name: storeName,
      province_id: parseInt(provinsi, 10),
      city_id: parseInt(kota, 10),
      address,
      website,
      contact_phone: phone,
      contact_wa: wa,
      is_active: true,
      is_approved: true,
      categories
    }
    return rp.post(`${baseURI}/api/submit-info`, {
      json: true,
      body: data
    }).then((res) => {
      console.info(res);
      if (res.statusCode === 200) {
        alert('Berhasil');
      } else {
        alert('Gagal!');
      }
    }).catch((err) => {
      alert(err.message)
    });
  }

  const changeProvinsi = (_, data) => {
    setProvinsi(data.value);
    setKota(0)
    fetchKota(data.value);
  }
  const changeKota = (_, data) => setKota(data.value);
  const changeStoreName = (_, data) => setStoreName(data.value);
  const changeAddress = (_, data) => setAddress(data.value);
  const changeWebsite = (_, data) => setWebsite(data.value);
  const changePhone = (_, data) => setPhone(data.value);
  const changeWA = (_, data) => setWA(data.value);
  const changeCategory1 = (e, data) => {
    const val = 'Penyewaan'
    if (data.checked) {
      setCategories((prevState) => [...prevState, val]);
    } else {
      setCategories((prevState) => prevState.filter((p) => p !== val));
    }
  }
  const changeCategory2 = (e, data) => {
    const val = 'Pembelian'
    if (data.checked) {
      setCategories((prevState) => [...prevState, val]);
    } else {
      setCategories((prevState) => prevState.filter((p) => p !== val));
    }
  }
  const changeCategory3 = (e, data) => {
    const val = 'Isi ulang'
    if (data.checked) {
      setCategories((prevState) => [...prevState, val]);
    } else {
      setCategories((prevState) => prevState.filter((p) => p !== val));
    }
  }

  const fetchProvinsi = async () => {
    await rp.get('https://rawcdn.githack.com/ibnux/data-indonesia/d63f1cf40b8f044212696bb90855068f249674d9/propinsi.json', {
      json: true
    }).then((res) => {
      if (res && res.length > 0) {
        const dataProvinsi = res.map((i) => ({
          key: i.id,
          value: i.id,
          text: i.nama
        }));
        setProvinsiData(dataProvinsi);
      }
    })
  }

  const fetchKota = async (provinceId) => {
    await rp.get(`https://rawcdn.githack.com/ibnux/data-indonesia/d63f1cf40b8f044212696bb90855068f249674d9/kabupaten/${provinceId}.json`, {
      json: true
    }).then((res) => {
      const dataKota = res.map((i) => ({
        key: i.id,
        value: i.id,
        text: i.nama
      }));
      setKotaData(dataKota);
    })
  }

  useEffect(() => {
    fetchProvinsi();
  }, []);

  return (
    <>
      <Container className="mt-5">
        <Form>
          <Form.Field
            control={Input}
            label="Store Name"
            placeholder='Store Name'
            onChange={changeStoreName}
          />
          <Form.Field
            id='form-textarea-control-address`  '
            control={TextArea}
            label='Address'
            placeholder='Address'
            onChange={changeAddress}
          />
           <Form.Field
            control={Input}
            label="Website"
            type="url"
            placeholder='Website'
            onChange={changeWebsite}
          />
          <Form.Group widths='equal'>
            <Form.Field
              control={Select}
              options={provinsiSource}
              onChange={changeProvinsi}
              label={{ children: 'Provinsi', htmlFor: 'form-select-control-gender' }}
              placeholder='Provinsi'
              search
              searchInput={{ id: 'form-select-control-gender' }}
            />
            <Form.Field
              control={Select}
              options={kotaSource}
              onChange={changeKota}
              label={{ children: 'Kota', htmlFor: 'form-select-control-gender' }}
              placeholder='Kota'
              search
              searchInput={{ id: 'form-select-control-gender' }}
            />
          </Form.Group>
          <Form.Field
            control={Input}
            label="Phone Number"
            type="number"
            placeholder='Phone Number'
            onChange={changePhone}
          />
          <Form.Field
            control={Input}
            label="WhatsApp Number"
            type="number"
            placeholder='WhatsApp Number'
            onChange={changeWA}
          />
         
          <Form.Group widths='equal'>
            <Form.Field
              control={Checkbox}
              label="Penyewaan"
              onChange={changeCategory1}
              defaultChecked
              toggle
            />
            <Form.Field
              control={Checkbox}
              label="Pembelian"
              onChange={changeCategory2}
              defaultChecked
              toggle
            />
            <Form.Field
              control={Checkbox}
              label="Isi ulang"
              onChange={changeCategory3}
              defaultChecked
              toggle
            />
          </Form.Group>
          <Form.Field
            id='form-button-control-public'
            control={Button}
            content='Submit'
            className="mt-5"
            onClick={submitData}
          />
        </Form>
      </Container>
    </>
  )
}

export default FormExampleForm;