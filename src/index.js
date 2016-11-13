import express from 'express';
import fetch from 'isomorphic-fetch';
import Promise from 'bluebird';
import _ from 'lodash';
import cors from 'cors';

var pc;
getPc();

const app = express();
app.use(cors());

app.get(/.+/, (req,res) => {
    let path = req.path.replace(/^\//,'').replace(/\/$/,'').split('/');
    if (path[0]=='volumes') res.json(getVolumes());
    else if (path[0]=='') res.json(pc);
    else sendComponent(path,res);
});

app.listen(3000);

function sendComponent(path, res) {
    let component = pc;
    try {
        path.forEach(el => {
            if (_.isArray(component)) {
                if(!_.isNaN(+el) && component.hasOwnProperty(el)) component=component[el];
                else throw new Error('Not Found');
            }
            else if (_.isString(component)) throw new Error('Not Found');
            else if (component.hasOwnProperty(el)) component=component[el];
            else throw new Error('Not found');
        });
        res.json(component);
    }
    catch(e) {
        res.sendStatus(404);
    }
}

function getVolumes() {
    const volumes={};
    var size;
    pc.hdd.forEach(el => {
        if(volumes[el.volume]) volumes[el.volume]+=el.size;
        else volumes[el.volume]=el.size;
    });
    for(size in volumes) volumes[size]+='B';
    //console.log(volumes);
    return volumes;
}

async function getPc() {
    const pcUrl='https://gist.githubusercontent.com/isuvorov/ce6b8d87983611482aac89f6d7bc0037/raw/pc.json';
    return await fetch(pcUrl)
    	.then(async (res) => pc = await res.json())
		.catch(e => console.log(e));
}