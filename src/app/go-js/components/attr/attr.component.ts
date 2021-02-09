import { Component, OnInit } from '@angular/core';
import {UserRole} from './model/UserRole';
import { GoJsService } from '../../go-js.service';
import { FormControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
@Component({
    selector: 'app-diagram-attr',
    templateUrl: './attr.component.html',
    styleUrls: ['./attr.component.scss'],
})

export class DiagramAttrComponent implements OnInit {

    Users: UserRole[];
    selectedUser: UserRole;
    formDestroy: any;
    flow: FormGroup;
    node: FormGroup;
    disableflag:boolean;

    currTab = true;

    dataBySync: any;

    constructor(
        private gjs: GoJsService,
        private formModel: FormBuilder
    ) {
        this.formDestroy = this.gjs.nodeDataSync.subscribe(e => {
            if (e === 'blur') {
                this.currTab = true;
            } else {
                this.dataBySync = e;
                this.currTab = false;
                this.node = this.formModel.group({
                    nodeName: e.text,
                    nodeDesc: e.nodeDesc,
                    nodeUser: e.nodeUser
                });
                this.selectedUser = e.nodeUser;
            }
        });
    }

    ngOnInit() {
        this.Users = [
            { userName: 'User001', userId: 'User001' },
            { userName: 'User002', userId: 'User002' },
            { userName: 'User003', userId: 'User003' },
            { userName: 'User004', userId: 'User004' },
            { userName: 'User005', userId: 'User005' }
        ];
        this.nodeformInit();
        this.flowformInit();
    }

    flowformInit() {
        const flowRow = JSON.parse(sessionStorage.getItem('flowRow'));
        this.flow = this.formModel.group({
            flowName: new FormControl(flowRow ? flowRow.FlowName : 'new item1', Validators.compose([Validators.required, Validators.maxLength(30)])),
            flowDesc: new FormControl(flowRow ? flowRow.FlowDesc : '', Validators.maxLength(300))
        });
    }

    nodeformInit() {
        this.node = this.formModel.group({
            nodeName: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(30)])),
            nodeDesc: new FormControl('', Validators.maxLength(300)),
            nodeUser: new FormControl('', Validators.maxLength(30))
        });
    }

    NodeSubmit(value){
        if (this.dataBySync) {
            this.dataBySync['nodeUser'] = value.nodeUser;
            this.dataBySync['text'] = value.nodeName;
            this.dataBySync['nodeDesc'] = value.nodeDesc;
            this.gjs.panelSyncDiagram.emit({ flag: 2, data: this.dataBySync});
            console.log(this.dataBySync);
        }
    }
    flowsubmit(value){
        const flowBySync = {};
        flowBySync['flowName'] = value.flowName;
        flowBySync['flowDesc'] = value.flowDesc;
        this.gjs.panelSyncDiagram.emit({ flag: 1, data: flowBySync});
    }
   
} 
