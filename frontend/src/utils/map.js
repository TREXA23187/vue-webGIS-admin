import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import {us} from '@/assets/js/us'
import {covid} from '@/assets/js/covid'
import axios from "axios";
import Vue from 'vue'

const createMap = () => {
    const map = L.map('map').setView([37.8, -96], 4);
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
        maxZoom: 18,
        id: 'mapbox/light-v9',
        tileSize: 512,
        zoomOffset: -1
    }).addTo(map);


    //controllers
    const btn_search = document.querySelector('#search')
    const btn_showAll = document.querySelector('#showAll')
    const btn_removeAll = document.querySelector('#removeAll')
    const state_input = document.querySelector('#state_input')
    //details
    const details = document.querySelector('#details')

    const info = L.control();

    info.onAdd = function (map) {
        this._div = L.DomUtil.create('div', 'info');
        this.update();
        return this._div;
    };

    info.update = function (props) {
        // console.log(this)
        this._div.innerHTML = '<h4>US Population Density</h4>' + (props ?
            '<b>' + (props.STATE_NAME) + '</b><br />' + (props.PERSONS) + ' people / mi<sup>2</sup>'
            : 'Hover over a state');
    };

    info.addTo(map);

    function getColor(d) {
        return d > 10000000 ? '#800026' :
            d > 8000000 ? '#BD0026' :
                d > 5000000 ? '#E31A1C' :
                    d > 2000000 ? '#FC4E2A' :
                        d > 1000000 ? '#FD8D3C' :
                            d > 500000 ? '#FEB24C' :
                                d > 100000 ? '#FED976' :
                                    '#FFEDA0';
    }

    function style(feature) {
        return {
            weight: 2,
            opacity: 1,
            color: 'white',
            dashArray: '3',
            fillOpacity: 0.7,
            fillColor: getColor(feature.properties.PERSONS)
        };
    }

    function setDetailsView(e,details_container,flag=false){
        const props = e.target.feature.properties
        const OTHERS = props.EMPLOYED - props.DRVALONE - props.CARPOOL - props.PUBTRANS
        // for(let i = 0;i<covid.length;i++){
        //   if(covid[i].area === props.STATE_NAME){
        //     confirm = covid[i].confirm
        //     break
        //   }
        // }
        details_container.innerHTML =`
            <h1>state_name : ${props.STATE_NAME}</h1>
            <h1>sub_region : ${props.SUB_REGION}</h1>
            <h1>state_abbr : ${props.STATE_ABBR}</h1>
            <h1>land_km : ${props.LAND_KM}</h1>
            <h1>water_km : ${props.WATER_KM}</h1>
            `
        if(flag){
            Vue.prototype.$utils.chart.myChart && Vue.prototype.$utils.chart.myChart.dispose()
            Vue.prototype.$utils.chart.myChart = Vue.prototype.$utils.chart.createChart(
                props.STATE_NAME,props.DRVALONE, props.CARPOOL, props.PUBTRANS, OTHERS);
        }
    }

    function highlightFeature(e) {
        const layer = e.target;

        layer.setStyle({
            weight: 5,
            color: '#666',
            dashArray: '',
            fillOpacity: 0.7
        });

        if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
            layer.bringToFront();
        }
        info.update(layer.feature.properties);

        setDetailsView(e,details)
    }

    let geojson;

    function resetHighlight(e) {
        geojson.resetStyle(e.target);
        info.update();
        // Vue.prototype.$utils.chart.myChart && Vue.prototype.$utils.chart.myChart.dispose()
    }

    function zoomToFeature(e) {
        // console.log(e)
        // const props = e.target.feature.properties
        // const others = props.EMPLOYED - props.DRVALONE - props.CARPOOL - props.PUBTRANS
        map.fitBounds(e.target.getBounds());
        setDetailsView(e,details,true)
    }

    function onEachFeature(feature, layer) {
        layer.on({
            mouseover: highlightFeature,
            mouseout: resetHighlight,
            click: zoomToFeature
        });
    }

    geojson = L.geoJson(null, {
        style: style,
        onEachFeature: onEachFeature
    }).addTo(map);

    // map.attributionControl.addAttribution('Population data &copy; <a href="http://census.gov/">US Census Bureau</a>');

    const legend = L.control({position: 'bottomright'});

    legend.onAdd = function (map) {

        let div = L.DomUtil.create('div', 'info legend'),
            grades = [0, 10000, 50000, 100000, 2000000, 500000, 8000000, 10000000],
            labels = [],
            from, to;

        for (let i = 0; i < grades.length; i++) {
            from = grades[i];
            to = grades[i + 1];

            labels.push(
                '<i style="background:' + getColor(from + 1) + '"></i> ' +
                from + (to ? '&ndash;' + to : '+'));
        }

        div.innerHTML = labels.join('<br>');
        return div;
    };

    legend.addTo(map);

    const states = new L.layerGroup()
    btn_search.addEventListener('click', () => {
        const state_name = state_input.value
        // const obj = $.ajax({url:`/usa?state_name=${state_name}`,async:false})
        axios({
            method: 'get',
            url: `/api/usa?state_name=${state_name}`,
        })
            .then(function (response) {
                btn_removeAll.click()
                // console.log(response.data.properties.state_name);
                const lng = response.data.geometry.coordinates[0][0][0]['0']
                const lat = response.data.geometry.coordinates[0][0][0]['1']
                geojson = L.geoJson(response.data, {
                    style: style,
                    onEachFeature: onEachFeature
                }).addTo(states)
                const latlngPoint = new L.LatLng(lat, lng)
                geojson.addEventListener('click', (e) => {
                    map.fitBounds(e.target.getBounds())
                    // console.log(e)
                })
                geojson.fire('click', {
                    latlng: latlngPoint,
                    // layerPoint: map.latLngToLayerPoint(latlngPoint),
                    // containerPoint: map.latLngToContainerPoint(latlngPoint)
                })
                const properties = response.data.properties
                details.innerHTML =
                    `
                        <h1>state_name : ${properties.STATE_NAME}</h1>
                        <h1>sub_region : ${properties.SUB_REGION}</h1>
                        <h1>state_abbr : ${properties.STATE_ABBR}</h1>
                        <h1>land_km : ${properties.LAND_KM}</h1>
                        <h1>water_km : ${properties.WATER_KM}</h1>
                    `
                // console.log(Vue.prototype.$utils.chart)
                Vue.prototype.$utils.chart.myChart = Vue.prototype.$utils.chart.createChart(properties.STATE_NAME,
                    properties.DRVALONE, properties.CARPOOL,
                    properties.PUBTRANS, properties.OTHERS);
            })
            .catch(function (error) {
                console.log(error);
            });
        states.addTo(map)
        // btn_details.click()

    })
    // let all = false
    btn_showAll.addEventListener('click', () => {
        btn_removeAll.click()
        geojson = L.geoJson(us, {
            style: style,
            onEachFeature: onEachFeature
        }).addTo(states)
        states.addTo(map)
        map.setView([37.8, -96], 4)
        // all = true
    })

    btn_removeAll.addEventListener('click', () => {
        states.eachLayer((layer) => {
            states.removeLayer(layer)
        })

        details.innerHTML = ''
        Vue.prototype.$utils.chart.myChart && Vue.prototype.$utils.chart.myChart.dispose()
    })

    return map
}

export default {
    createMap,
}
