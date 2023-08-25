import React, { useState } from 'react';
import * as Speech from 'expo-speech';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import ImageMapper from 'react-native-image-mapper';

const App = () => {
  const [selectedAreaId, setSelectedAreaId] = useState("");
  const [selectedAreaName, setSelectedAreaName] = useState("");

  const mapperAreaClickHandler = (item) => {
    
    const currentSelectedAreaId = selectedAreaId;
    if (Array.isArray(currentSelectedAreaId)) {
      const indexInState = currentSelectedAreaId.indexOf(item.id);
      if (indexInState !== -1) {
        console.log('Removing id', item.id);
        setSelectedAreaId([
          ...currentSelectedAreaId.slice(0, indexInState),
          ...currentSelectedAreaId.slice(indexInState + 1),
        ]);
      } else {
       
        console.log('Setting Id', item.id);
        setSelectedAreaId([...currentSelectedAreaId, item.id]);
        setSelectedAreaName(item.name)
      }
    } else {
      if (item.id === currentSelectedAreaId) {
        setSelectedAreaId(null);
      } else {
        setSelectedAreaId(item.id);
        setSelectedAreaName(item.name)
      }
    }
  };

  const speak = () => {
   
    Speech.speak(selectedAreaName);
  };
  const renderOverlay = (item) => {
    const overlayStyle = {
      position: 'absolute',
      top: item.y1,
      left: item.x1,
      width: item.x2 - item.x1,
      height: item.y2 - item.y1,
      borderColor: 'black', // Set the outline color
      borderWidth: 5,       // Set the outline thickness
      opacity: 0,         // Set the opacity to make it transparent
    };

    return (
      <TouchableOpacity
        key={item.id}
        style={overlayStyle}
        onPress={() => mapperAreaClickHandler(item)}
      />
    );
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', padding: 20 }}>
      <ImageMapper
        imgHeight={281}
        imgWidth={350}
        imgSource={{
          uri: 'https://easydrawingguides.com/wp-content/uploads/2017/04/how-to-draw-a-cartoon-cow-featured-image-1200.png',
        }}
        imgMap={[] /* Remove the imgMap from here */}
        containerStyle={{ top: 1 }}
        selectedAreaId={selectedAreaId}
        multiselect
      />

      {RECTANGLE_MAP.map((item) => renderOverlay(item))}

      {selectedAreaId && <Button title={selectedAreaName} onPress={speak} />}
    </View>
  );
};


export default App;


const RECTANGLE_MAP = [
  
  
  {
    id: '2',
    name: 'Right Ear',
    shape: 'rectangle',
    x2: 170,
    y2: 90,
    x1: 115,
    y1: 1,
    // prefill: getRandomColor(),
   
    
  },
  {
    id: '3',
    name: 'Left Ear',
    shape: 'rectangle',
    x2: 35,
    y2: 80,
    x1:10,
    y1: 20,
    // prefill: getRandomColor(),
    stroke: 'black', // Set the outline color
    strokeWidth: 2,
    
  },
  {
    id: '4',
    name: 'Front Legs',
    shape: 'rectangle',
    x2: 175,
    y2: 300,
    x1: 120,
    y1: 195,
    // prefill: getRandomColor(),
    stroke: 'black', // Set the outline color
    strokeWidth: 2,
    
  },
  {
    id: '5',
    name: 'Tail',
    shape: 'rectangle',
    x2: 350,
    y2: 250,
    x1: 297,
    y1: 85,
    // prefill: getRandomColor(),
    stroke: 'black', // Set the outline color
    strokeWidth: 2,
    
  },
  {
    id: '6',
    name: 'Back Legs',
    shape: 'rectangle',
    x2: 295,
    y2: 300,
    x1: 220,
    y1: 195,
    // prefill: getRandomColor(),
    stroke: 'black', // Set the outline color
    strokeWidth: 2,
    
  },
  {
    id: '7',
    name: 'Stomach',
    shape: 'rectangle',
    x2: 295,
    y2: 220,
    x1: 120,
    y1: 90,
    // prefill: getRandomColor(),
    stroke: 'black', // Set the outline color
    strokeWidth: 2,
    
  },
  {
    id: '8',
    name: 'Head',
    shape: 'rectangle',
    x2: 115,
    y2: 140,
    x1: 26,
    y1: 50,
    // prefill: getRandomColor(),
    stroke: 'black', // Set the outline color
    strokeWidth: 2,
    
  },
];