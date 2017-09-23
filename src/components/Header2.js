import React, { Component } from 'react';
import { connect } from 'react-redux';

import LayersList from './LayersList.js';

import {panelsOther} from '../non-db/panelsOther.js';

import {updatePanelNone, updatePanelSmall, updatePanelLarge, updatePanelStart, updatePanelMid} from '../action-creators/optionActionsNDB.js';
import {updateColor, updateAnno, updateDetail} from '../action-creators/optionActionsNDB.js';
//connect later?
import {addSelectLayer, deleteSelectLayer, addAllLayers, addHoverSite, setSpecPanel, updateSite} from '../action-creators/siteActionsNDB.js';

import {updateOffsets, updateOffsetsResidual } from '../action-creators/mapActions.js';

import {setNarr, setTitlesCore} from '../action-creators/panelActions.js';


class Header2 extends Component {
    constructor(props){
    super(props);
    this.state={
      y:0,
    };
    this.changePanel= this.changePanel.bind(this);
  }

  changePanel(e){
    e.preventDefault();
   let val = (e.target.attributes.value.value);

   if ((val === 'intro' || val === 'bibliography'|| val === 'contributors'|| val === 'navigation')){

      if (!this.props.options.panelSmall){this.props.panelSmall()};
      this.props.setColor(false);
      this.props.setAnno(true);
      this.props.setDetail(true);

      this.props.setSpecPanel(val);
      this.props.updateSite(0);
      this.props.setTitles(panelsOther[val].title);
      this.props.updateNarrative(panelsOther[val].obj);

    } else if (val === 'sites'){
      if (!this.props.options.panelSmall){this.props.panelSmall()};
      this.props.setColor(false);
      this.props.setAnno(true);
      this.props.setDetail(true);
      this.props.loadSelectAll('add');

      this.props.setSpecPanel('');
      //12 is san marco

      let site = this.props.sites.allSites.filter(site=>{
        return +site.id === 12
      })[0];
      let narrative = this.props.sites.genNarratives.filter(site=>{
        return +site.coreId === 12
      })[0];

      this.props.updateSite(12);
      this.props.setTitles(site.name.split('.'));
      this.props.updateNarrative(narrative);

    } else if (val === 'maps' || val === 'prints'){

      if (val !== this.props.sites.specLayer){
      this.props.panelLarge();
      this.props.setSpecPanel(val);

      if (val === 'maps' ) {
        this.props.setColor(true);
        this.props.setAnno(false);
        this.props.setDetail(false);

          var offs=this.props.map.xyOffsets;
          this.setState({y:offs[1]});
          if (offs[1]<0){ offs[1]=0 ; this.props.setOffsetsR(offs); this.props.setCurrOffsets(offs);}

        } else if (val === 'prints' ) {

          this.props.loadSelectAll('clear');
          this.props.addSelectOne('printing');

          var offs=this.props.map.xyOffsets;
          this.setState({y:offs[1]});
          if (offs[1]<0){ offs[1]=0 ; this.props.setOffsetsR(offs); this.props.setCurrOffsets(offs);}

        }


      } else {
        this.props.panelSmall();
        this.props.setSpecPanel('intro');
          this.props.setColor(false);
          this.props.setAnno(true);
          this.props.setDetail(true);

          this.props.loadSelectAll('add');

          var offs=this.props.map.xyOffsets;
          var y = this.state.y;
          offs[1]=y ; this.props.setOffsetsR(offs); this.props.setCurrOffsets(offs);

      }

    }

  }

  render(){

  return (
          <div className="row flex bottom header">
                        <div className="col-xs-8">
                                <h2 className="closerT"><span className="BornholmSandvig">Merlo's Map </span><span className="small texta" style={{color: '#352c1a'}}> The Religious Geography of Venice</span></h2>
                          <LayersList layers={this.props.sites.currLayers} type="span" />
                        </div>
                        <div className="col-xs-4">
                          <div className="row flex around" style={{marginTop:'5px'}}>
                            <span className="texta m10 bNav" value="intro" onTouchTap={this.changePanel} >An Introduction</span>
                            <span className="texta m10 bNav" value="prints" onTouchTap={this.changePanel}>Printing Context</span>
                            <span className="texta m10 bNav" value="maps" onTouchTap={this.changePanel}>Cartographic Context</span>
                          </div>
                          <div className="row flex around" style={{marginBottom:'5px'}}>
                            <span className="texta m10 bNav" value="bibliography" onTouchTap={this.changePanel}>Bibliography</span>
                            <span className="texta m10 bNav" value="contributors" onTouchTap={this.changePanel}>Contributors</span>
                            <span className="texta m10 bNav" value="navigation" onTouchTap={this.changePanel}>Navigation Help</span>
                          </div>
                        </div>
            {/*<div className="col-lg-1">
              <h4 className="BornholmSandvig closerT text-right ">Layers:</h4>
              <p className="closerB text-right"> </p>
            </div>*/}
          </div>
          )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    sites: state.sites,
    options: state.options,
    map: state.map,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    panelStart: () => {
      dispatch(updatePanelStart());
    },
    panelMid: () => {
      dispatch(updatePanelMid());
    },
    panelNone: () => {
      dispatch(updatePanelNone());
    },
    panelSmall: () => {
      dispatch(updatePanelSmall());
    },
    panelLarge: () => {
        dispatch(updatePanelLarge());
    },
    loadSelectAll: (add) => {
        dispatch(addAllLayers(add));
    },
    addSelectOne: (layer) => {
        dispatch(addSelectLayer(layer));
    },
    deleteSelectOne: (layer) => {
        dispatch(deleteSelectLayer(layer));
    },
    setHoverLabel: (layer) => {
      dispatch(addHoverSite(layer));
    },
    setSpecPanel: (type) => {
      dispatch(setSpecPanel(type));
    },
    setColor: (bool) => {
      dispatch(updateColor(bool));
    },
    setAnno: (bool) => {
      dispatch(updateAnno(bool));
    },
    setDetail: (bool) => {
        dispatch(updateDetail(bool));
    },
    setCurrOffsets: (offsets) => {
      dispatch(updateOffsets(offsets));
    },
    setOffsetsR: (offsets) => {
        dispatch(updateOffsetsResidual(offsets));
    },
    updateSite: (site) => {
      dispatch(updateSite(site));
    },
    setTitles: (name) => {
        dispatch(setTitlesCore(name));
    },
    updateNarrative: (obj) => {
        dispatch(setNarr(obj));
    },
  }
}

const HeaderOpt = connect(mapStateToProps, mapDispatchToProps)(Header2);

export default HeaderOpt;
