import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, FlatList, Modal} from 'react-native';
import MapView, { Marker , Polyline} from 'react-native-maps';
import * as Location from 'expo-location';
import { BlurView } from 'expo-blur';

export default function App() {
  const [initialRegion, setInitialRegion] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [showInicioLista, setShowInicioLista] = useState(false);
  const [showFimLista, setShowFimLista] = useState(false);
  const [selectedInicio, setSelectedInicio] = useState(null);
  const [selectedFim, setSelectedFim] = useState(null);
  
  const data= [
    {id: 1, label: 'Inicio Rota Acessivel'},
    {id: 2, label: 'Bloco c'},
    {id: 3, label: 'Biblioteca'},
    {id: 4, label: 'Centro de Convivencia'},
    {id: 5, label: 'Bloco a ser adicionado'},
    {id: 6, label: 'Bloco a ser adicionado'},
    {id: 7, label: 'Bloco a ser adicionado'},
    {id: 8, label: 'Bloco a ser adicionado'},
  ]

  const rotaInicioBiblioteca = [
    { latitude: -3.770611359295958, longitude: -38.4818297624588 },
    { latitude: -3.770481888295082, longitude: -38.48185122013092 },
    { latitude: -3.770376504908036, longitude: -38.48185859620571 },
    { latitude: -3.7702560667357865, longitude: -38.48185759037733 },
    { latitude: -3.7701286029852983, longitude: -38.48187167197466 },
    { latitude: -3.770009168430489, longitude: -38.481887094676495 },
    { latitude: -3.7699151597077387, longitude: -38.48184585571289 },
    { latitude: -3.769852264186497, longitude: -38.48178047686815 },
    { latitude: -3.7697883650086568, longitude: -38.48170403391123 },
    { latitude: -3.7697358405500476, longitude: -38.4816363081336 },
    { latitude: -3.7696806396824845, longitude: -38.4815638884902 },
    { latitude: -3.7696271115651516, longitude: -38.481470346450806 },
    { latitude: -3.7695705724876283, longitude: -38.48136808723211 },
    { latitude: -3.7695187171174473, longitude: -38.481280580163 },
    { latitude: -3.7694889420970448, longitude: -38.4811994433403 },
    { latitude: -3.769437086721991, longitude: -38.481102883815765 },
    { latitude: -3.7694006206821937, longitude: -38.481010012328625 },
    { latitude: -3.7693484307510308, longitude: -38.480911776423454 },
    { latitude: -3.7692982481219457, longitude: -38.48081488162279 },
    { latitude: -3.7692480654899727, longitude: -38.480705581605434 },
    { latitude: -3.7692139412985797, longitude: -38.48060801625252 },
    { latitude: -3.7691590749488193, longitude: -38.48051380366087 },
    { latitude: -3.769073764459084, longitude: -38.48052620887756 }, // bbi
    { latitude: -3.769012541631892, longitude: -38.48054599016905 },  // bb]
  ]
  const rotaInicioBlococ=[
    { latitude: -3.770611359295958, longitude: -38.4818297624588 },
    { latitude: -3.770481888295082, longitude: -38.48185122013092 },
    { latitude: -3.770376504908036, longitude: -38.48185859620571 },
    { latitude: -3.7702560667357865, longitude: -38.48185759037733 },
    { latitude: -3.7701286029852983, longitude: -38.48187167197466 },
    { latitude: -3.770009168430489, longitude: -38.481887094676495 },
    { latitude: -3.7699151597077387, longitude: -38.48184585571289 },
    { latitude: -3.769852264186497, longitude: -38.48178047686815 },
    { latitude: -3.7697883650086568, longitude: -38.48170403391123 },
    { latitude: -3.7697358405500476, longitude: -38.4816363081336 },
    { latitude: -3.7696806396824845, longitude: -38.4815638884902 },
    { latitude: -3.7696271115651516, longitude: -38.481470346450806 },
    { latitude: -3.7695705724876283, longitude: -38.48136808723211 },
    { latitude: -3.7696057003173, longitude: -38.48131041973829 },
    { latitude: -3.769648188261754, longitude: -38.481266498565674 },
  ]
  const rotaInicioCentrodeConvivencia=[
    { latitude: -3.770611359295958, longitude: -38.4818297624588 },
  { latitude: -3.770481888295082, longitude: -38.48185122013092 },
  { latitude: -3.770376504908036, longitude: -38.48185859620571 },
  { latitude: -3.7702560667357865, longitude: -38.48185759037733 },
  { latitude: -3.7701286029852983, longitude: -38.48187167197466 },
  { latitude: -3.770009168430489, longitude: -38.481887094676495 },
  { latitude: -3.7699151597077387, longitude: -38.48184585571289 },
  { latitude: -3.769852264186497, longitude: -38.48178047686815 },
  { latitude: -3.7697883650086568, longitude: -38.48170403391123 },
  { latitude: -3.7697358405500476, longitude: -38.4816363081336 },
  { latitude: -3.7696806396824845, longitude: -38.4815638884902 },
  { latitude: -3.7696271115651516, longitude: -38.481470346450806 },
  { latitude: -3.7695705724876283, longitude: -38.48136808723211 },

  { latitude: -3.7695187171174473, longitude: -38.481280580163 },
  { latitude: -3.7694889420970448, longitude: -38.4811994433403 },
  { latitude: -3.769437086721991, longitude: -38.481102883815765 },
  { latitude: -3.7694006206821937, longitude: -38.481010012328625 },
  { latitude: -3.7693484307510308, longitude: -38.480911776423454 },
  { latitude: -3.7692982481219457, longitude: -38.48081488162279 },
  { latitude: -3.7692480654899727, longitude: -38.480705581605434 },
  { latitude: -3.7692139412985797, longitude: -38.48060801625252 },
  { latitude: -3.7691590749488193, longitude: -38.48051380366087 },

  { latitude: -3.7691784789021754, longitude: -38.480443730950356 },
  { latitude: -3.7691995556096423, longitude: -38.48035387694836 },
  { latitude: -3.7692510764479747, longitude: -38.48025429993868 },
  { latitude: -3.769269476746641, longitude: -38.48016411066055 },
  { latitude: -3.7692775059677515, longitude: -38.48007559776306 },
  { latitude: -3.7692885461466608, longitude: -38.47997970879078 },
  { latitude: -3.7692761677642412,longitude: -38.47986672073603},
  {latitude: -3.769247730939079, longitude: -38.479748368263245,}

  ]
  const rotaBibilotecaBlococ=[
  { latitude: -3.769648188261754, longitude: -38.481266498565674 },  //bloco c
  { latitude: -3.7695187171174473, longitude: -38.481280580163 },
  { latitude: -3.7694889420970448, longitude: -38.4811994433403 },
  { latitude: -3.769437086721991, longitude: -38.481102883815765 },
  { latitude: -3.7694006206821937, longitude: -38.481010012328625 },
  { latitude: -3.7693484307510308, longitude: -38.480911776423454 },
  { latitude: -3.7692982481219457, longitude: -38.48081488162279 },
  { latitude: -3.7692480654899727, longitude: -38.480705581605434 },
  { latitude: -3.7692139412985797, longitude: -38.48060801625252 },
  { latitude: -3.7691590749488193, longitude: -38.48051380366087 },
  { latitude: -3.769073764459084, longitude: -38.48052620887756 }, // bbi
  { latitude: -3.769012541631892, longitude: -38.48054599016905 },  // bb
  ]
  const rotaBlococCentrodeConvivencia=[
    { latitude: -3.769648188261754, longitude: -38.481266498565674 },  //bloco c
    { latitude: -3.7695187171174473, longitude: -38.481280580163 },
    { latitude: -3.7694889420970448, longitude: -38.4811994433403 },
    { latitude: -3.769437086721991, longitude: -38.481102883815765 },
    { latitude: -3.7694006206821937, longitude: -38.481010012328625 },
    { latitude: -3.7693484307510308, longitude: -38.480911776423454 },
    { latitude: -3.7692982481219457, longitude: -38.48081488162279 },
    { latitude: -3.7692480654899727, longitude: -38.480705581605434 },
    { latitude: -3.7692139412985797, longitude: -38.48060801625252 },
    { latitude: -3.7691590749488193, longitude: -38.48051380366087 },
    { latitude: -3.7691784789021754, longitude: -38.480443730950356 },
    { latitude: -3.7691995556096423, longitude: -38.48035387694836 },
    { latitude: -3.7692510764479747, longitude: -38.48025429993868 },
    { latitude: -3.769269476746641, longitude: -38.48016411066055 },
    { latitude: -3.7692775059677515, longitude: -38.48007559776306 },
    { latitude: -3.7692885461466608, longitude: -38.47997970879078 },
    { latitude: -3.7692761677642412,longitude: -38.47986672073603},
    {latitude: -3.769247730939079, longitude: -38.479748368263245,}
  
  ]
  const rotaCentrodeConvivenciaBiblioteca=[
    { latitude: -3.769012541631892, longitude: -38.48054599016905 },  // bb
    { latitude: -3.7691784789021754, longitude: -38.480443730950356 },
    { latitude: -3.7691995556096423, longitude: -38.48035387694836 },
    { latitude: -3.7692510764479747, longitude: -38.48025429993868 },
    { latitude: -3.769269476746641, longitude: -38.48016411066055 },
    { latitude: -3.7692775059677515, longitude: -38.48007559776306 },
    { latitude: -3.7692885461466608, longitude: -38.47997970879078 },
    { latitude: -3.7692761677642412,longitude: -38.47986672073603},
    {latitude: -3.769247730939079, longitude: -38.479748368263245,}
  
  
  ]

  const rotaBibliotecaInicio = rotaInicioBiblioteca.slice().reverse();
  const rotaBlococIninicio = rotaInicioBlococ.slice().reverse();
  const rotaCentrodeConvivenciaInicio = rotaInicioCentrodeConvivencia.slice().reverse();
  const rotaBlococBiblioteca= rotaBibilotecaBlococ.slice().reverse();
  const rotaCentrodeConvivenciaBlococ = rotaBlococCentrodeConvivencia.slice().reverse();
  const rotaBibliotecaCentrodeConvivencia = rotaCentrodeConvivenciaBiblioteca.slice().reverse();

   const routes = {
    'Inicio Rota Acessivel - Bloco c':rotaInicioBlococ,
    'Bloco c - Inicio Rota Acessivel':rotaBlococIninicio,
    'Inicio Rota Acessivel - Biblioteca': rotaInicioBiblioteca,
    'Biblioteca - Inicio Rota Acessivel': rotaBibliotecaInicio,
    'Inicio Rota Acessivel - Centro de Convivencia':rotaInicioCentrodeConvivencia,
    'Centro de Convivencia - Inicio Rota Acessivel':rotaCentrodeConvivenciaInicio,
    'Bloco c - Biblioteca':rotaBlococBiblioteca,
    'Biblioteca - Bloco c':rotaBibilotecaBlococ,
    'Centro de Convivencia - Bloco c':rotaCentrodeConvivenciaBlococ,
    'Bloco c - Centro de Convivencia':rotaBlococCentrodeConvivencia,
    'Biblioteca - Centro de Convivencia':rotaBibliotecaCentrodeConvivencia,
    'Centro de Convivencia - Biblioteca':rotaBibliotecaCentrodeConvivencia,
  }

  const getRouteCoordinates = (inicio, fim) => {
    const routeKey = `${inicio} - ${fim}`;
    if (routes.hasOwnProperty(routeKey)) {
      return routes[routeKey];
    } else {
      return null; // Caso não encontre a rota, retorna null
    }
  };

  const [rotaSelecionada, setRotaSelecionada] = useState(null);
 
  const handlerInicioPress = () => {
    setShowInicioLista(!showInicioLista);
    setShowFimLista(false);
  };

  const handlerFimPress = () => {
    setShowFimLista(!showFimLista);
    setShowInicioLista(false);
  };

  const handleInicioItemPress = (item) => {
    setSelectedInicio(item.label); // Save the selected value
    setShowInicioLista(false); // Close the list
  };

  const handleFimItemPress = (item) => {
    setSelectedFim(item.label); // Save the selected value
    setShowFimLista(false); // Close the list
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permissão de localização negada!');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      setInitialRegion({
        latitude,
        longitude,
        latitudeDelta: 0.006,
        longitudeDelta: 0.006,
      });
      setUserLocation({ latitude, longitude });

      Location.watchPositionAsync(
        { distanceInterval: 100, timeInterval: 1000 },
        (location) => {
          const { latitude, longitude } = location.coords;
          setInitialRegion({
            ...initialRegion,
            latitude,
            longitude,
          });
          setUserLocation({ latitude, longitude });
        }
      );
    })();
  }, []);

  useEffect(() => {
    if (selectedInicio && selectedFim) {
      const rotaCoords = getRouteCoordinates(selectedInicio, selectedFim);
      setRotaSelecionada(rotaCoords);
    }
  }, [selectedInicio, selectedFim]);  // para calcular a rota apos serem definidos ponto de inicio e ponto de fim

  return (
    <View style={styles.container}>
      
      <MapView style={styles.map} initialRegion={initialRegion}>
      {userLocation && <Marker coordinate={userLocation} pinColor="#474744" />}
  
  {rotaSelecionada && (
    <Polyline
      coordinates={rotaSelecionada}
      strokeColor="purple" 
      strokeWidth={5} 
    />
  )}
</MapView>
      <View style={styles.viewbotoes}>
      <TouchableOpacity style={styles.butaoinicio} onPress={handlerInicioPress}>
      <Text style={styles.butaotextinicio}>Selecionar Inicio</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.butaoFim} onPress={handlerFimPress}>
      <Text style={styles.butaotextinicio}>Selecionar destino</Text>
      </TouchableOpacity>
      </View>
      <Modal visible={showInicioLista || showFimLista} transparent>
        <View style={styles.modalContainer}>
          <BlurView intensity={100} style={styles.blurContainer} blurType="light" blurAmount={10}>
            <View style={styles.listContainer}>
              {showInicioLista && (
                <FlatList
                  data={data}
                  keyExtractor={(item) => item.id}
                  contentContainerStyle={styles.listContent} // Novo estilo para centralizar a lista
                  renderItem={({ item }) => (
                    <TouchableOpacity style={styles.listItem} onPress={() => handleInicioItemPress(item)}>
                      <Text>{item.label}</Text>
                    </TouchableOpacity>
                  )}
                />
              )}

              {showFimLista && (
                <FlatList
                  data={data}
                  keyExtractor={(item) => item.id}
                  contentContainerStyle={styles.listContent} // Novo estilo para centralizar a lista
                  renderItem={({ item }) => (
                    <TouchableOpacity style={styles.listItem} onPress={() => handleFimItemPress(item)}>
                      <Text>{item.label}</Text>
                    </TouchableOpacity>
                  )}
                />
              )}
            </View>
          </BlurView>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: '100%',
    height: '90%',
  },
  butaoinicio:{
backgroundColor:	'#0000ff',
alignItems:'center',
borderRadius: 5,
width: 190,
height: 40,
justifyContent: "center",
marginRight: 5
},

butaoFim:{
backgroundColor:	'red',
alignItems:'center',
borderRadius: 5,
width: 190,
height: 40,
justifyContent: "center",
},
viewbotoes:{
  flexDirection: 'row',
  marginTop: 20,
},
  butaotextinicio:{
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background for the modal
  },
  blurContainer: {
    borderRadius: 10,
    padding: 20,
    margin: 10, // Add margin to position the BlurView on top of the map
  },
  listContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1, // Ocupar todo o espaço vertical disponível
    flexDirection : 'row'
  },
  listContent: {
    width: '100%', // Ajuste a largura conforme necessário
  },
  listItem: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 30,
    marginBottom: 30,
    paddingVertical: 10, // Diminuir o espaçamento vertical
    paddingHorizontal: 20, // Aumentar o espaçamento horizontal
    marginVertical: 10, // Diminuir o espaçamento vertical entre os itens
    marginHorizontal: 10, // Aumentar o espaçamento horizontal entre os itens
  
  },
});
