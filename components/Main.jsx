import { useState, useEffect } from "react";
import { Segment, Image, Container, Header, Select, Form, Button, Card, Icon, Dimmer, Loader, Label, Input, Grid } from "semantic-ui-react";
import rp from 'request-promise';

const categorySource = [
  {type: 'all', value: 'all', text: '--- Semua ---'},
  {type: 'isi-ulang', value: 'isi-ulang', text: 'Isi Ulang'},
  {type: 'penyewaan', value: 'penyewaan', text: 'Penyewaaan'},
  {type: 'pembelian', value: 'pembelian', text: 'Pembelian'},
];

const MainComponent = (_) => {
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [provinsiSource, setProvinsiData] = useState([]);
  const [kotaSource, setKotaData] = useState([]);
  const [provinsi, setProvinsi] = useState(0);
  const [kota, setKota] = useState(0);
  const [category, setCategory] = useState('all');
  const [stores, setStores] = useState([]);

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

  const fetchStore = async () => {
    const baseURI = process.env.NODE_ENV === 'production' ? 'https://info-tabung-oksigen.vercel.app' : 'http://localhost:5000';
    setLoading(true);
    setNotFound(false);
    await rp.get(`${baseURI}/api/filter?provinsi=${provinsi}&kota=${kota}&category=${category}`, {
      json: true
    }).then((res) => {
      setStores(res.data);
      if (res.data.length === 0) setNotFound(true);
    }).finally(() => setLoading(false))
  }

  const changeProvinsi = (_, data) => {
    setProvinsi(data.value);
    setKota(0)
    fetchKota(data.value);
  }
  const changekota = (_, data) => setKota(data.value);
  const changeCategory = (_, data) => setCategory(data.value);

  useEffect(() => {
    fetchProvinsi();
  }, []);
  
  return (
    <>
      <Image src='/oksigen.png' size="medium" centered style={{padding: '50px 0 0'}} />
      <Container style={{ textAlign:'center', marginTop:'20px'} }>
        <div style={{ paddingBottom: '30px' }}>
          <Header as='h1' style={{ paddingBottom: '0', fontFamily: 'Poppins, sans-serif' }}>Pencarian Tabung Oksigen</Header>
          <p style={{ fontSize: '11.5pt' }}>Informasi Pembelian/Penyewaan atau Isi Ulang Tabung Oksigen <br/> (silahkan pilih Provinsi dan Kota Anda untuk melakukan pencarian)</p>
          <p>Bantu unggah informasi Tabung melalui <a href="https://forms.gle/oENFrZRxJ6xsTSG79" target="_blank">Submit Data</a></p>
        </div>
        <Form className="centered">
          <Form.Group widths={12}>
            <Form.Field width={3} />
            <Form.Field control={Select} placeholder='Pilih provinsi' search options={provinsiSource} className='mb-1 mr-1' onChange={changeProvinsi} width={3} />
            <Form.Field control={Select} placeholder='Pilih kota' search options={kotaSource} className='mb-1 mr-1' onChange={changekota} width={3} />
            <Form.Field control={Select} placeholder='Pilih kategori' search options={categorySource} className='mb-1 mr-1' onChange={changeCategory} width={3} />
            <Form.Field control={Button} content='Cari' icon='search' primary onClick={fetchStore} />
          </Form.Group>
        </Form>
      </Container>

      <Container fluid style={{marginTop: '50px'}}>

        { loading && (
          <Dimmer active inverted>
            <Loader content='Memuat' size="big" />
          </Dimmer>
        )}

        <Card.Group centered>

          { notFound && stores.length <= 0 && (
            <Header as='h3' dividing className='mt-2'>
              Tidak ada data ditemukan
            </Header> 
          )}

          { stores && stores.length > 0 && stores.map((store) => {
            return (
              <Card>
                <Card.Content>
                  <Card.Header style={{ paddingBottom: '5px' }}> { store.store_name }</Card.Header>
                  <Card.Meta>Kontak: { store.contact_phone }</Card.Meta>
                  <Card.Description className="mt-2">
                    { store.address }
                    { store.website && <>
                        <p><br/><a href={store.website} target="_blank">{store.website}</a></p>
                      </> 
                    }
                  </Card.Description>
                  <Card.Description>
                  
                  </Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <div className='ui two buttons'>
                    <Button basic color='green' as='a' href={`tel:${store.contact_phone}`}>
                      <Icon name='phone volume' /> Telp
                    </Button>
                    <Button basic color='red' as='a' href={`http://maps.google.com/?q=${store.address}`} target='_blank'>
                      <Icon name='map marker alternate' /> Map
                    </Button>
                  </div>
                </Card.Content>
                <Segment>
                  {/* <Label attached='bottom'>CSS</Label> */}
                  { store.categories && store.categories.map((category) => {
                    return (
                      <Label as='a'>
                        { category }
                      </Label>
                    )
                  })}
                </Segment>
              </Card>
            )
          })}
        </Card.Group>
      </Container>

      <Container style={{textAlign: 'center', marginTop: '100px', paddingBottom: '20px'}}>
        <p>Made with 🤍 by <a href="https://github.com/bayungrh" target="_blank">BayuN</a>. <br/>Build using Next.js, Semantic UI &amp; Firestore.</p>
      </Container>
    </>
  )
}

export default MainComponent;