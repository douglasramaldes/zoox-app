import { Component, OnInit } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { State, City } from '../_models';
import { StateService, CityService } from '../_services';
import { first } from 'rxjs/operators';
import * as moment from 'moment';

class StatesRegistration {
    constructor(
        public _id: string = null,
        public name: string = '',
        public abbreviation: string = '',
        public created_at: string = null,
        public updated_at: string = null,
    ) { }
}

class CitiesRegistration {
    constructor(
        public _id: string = null,
        public name: string = '',
        public state: string = '',
        public stateId: string = '',
        public created_at: string = null,
        public updated_at: string = null,
    ) { }
}

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    public searchText: string;
    searchTextCities: string;
    states: State[] = [];
    cities: City[] = [];
    stateModel: StatesRegistration;
    cityModel: CitiesRegistration
    showNewState: Boolean = false;
    showNewCity: Boolean = false
    submitType: string = 'Salvar';
    selectedRow: number;
    constructor(
        private stateService: StateService,
        private cityService: CityService,
    ) { }

    ngOnInit() {
        this.loadAllStates();
        this.loadAllCities();
    }

    onNewState() {
        this.stateModel = new StatesRegistration();
        this.submitType = 'Salvar';
        this.showNewState = true;
    }

    onNewCity() {
        this.cityModel = new CitiesRegistration();
        this.submitType = 'Salvar';
        this.showNewCity = true;
    }

    onSaveState() {
        if (this.submitType === 'Salvar') {
            this.saveState()

        }
        if (this.submitType !== 'Salvar') {
            const data = this.stateModel
            this.updateState(data._id, data)
        }
        this.showNewState = false;
    }

    onSaveCity() {
        if (this.submitType === 'Salvar') {
            this.saveCity()

        }
        if (this.submitType !== 'Salvar') {
            const data = this.cityModel
            this.updateCity(data._id, data)
        }
        this.showNewCity = false;
    }

    onEditState(index: number) {
        this.selectedRow = index;
        this.stateModel = new StatesRegistration();
        this.stateModel = Object.assign({}, this.states[this.selectedRow]);
        this.submitType = 'Atualizar';
        this.showNewState = true;
    }

    onEditCity(state: string, stateId: string, index: number) {
        this.selectedRow = index;
        this.cityModel = new CitiesRegistration();
        this.cityModel = Object.assign({}, this.cities[this.selectedRow]);
        this.cityModel.state = state
        this.cityModel.stateId = stateId
        this.submitType = 'Atualizar';
        this.showNewCity = true;
    }

    onDeleteState(id: string, index: number) {

        const arr = this.states.filter(function (e: any) { return e._id !== id });
        this.states = arr
        this.stateService.delete(id)
            .subscribe(
                (state: any) => {
                },
                err => {
                    console.log(err)
                }
            )
    }

    onDeleteCity(id: string, index: number) {

        const arrcity = this.cities.filter(function (e: any) { return e._id !== id });
        this.cities = arrcity

        this.cityService.delete(id)
            .subscribe(
                (state: any) => {
                },
                err => {
                    console.log(err)
                }
            )
    }

    onCancelState() {
        this.showNewState = false;
    }

    onCancelCity() {
        this.showNewCity = false;
    }

    onChangeState(state: string, stateId: string) {
        this.cityModel.state = state;
        this.cityModel.stateId = stateId;
    }

    loadAllStates() {
        this.stateService.getAll().pipe(first()).subscribe(states => {
            const formatHour = states.map(state => {
                const timeCreate = moment(state.created_at).utcOffset("-03:00").format('DD/MM/YYYY-HH:mm')
                if (state.updated_at) {
                    const timeUpdate = moment(state.updated_at).utcOffset("-03:00").format('DD/MM/YYYY-HH:mm')
                    state.updated_at = timeUpdate
                }
                state.created_at = timeCreate
                return
            })
            this.states = states;
        });
    }

    loadAllCities() {
        this.cityService.getAll().pipe(first()).subscribe(cities => {
            const formatHour = cities.map(city => {
                const timeCreate = moment(city.created_at).utcOffset("-03:00").format('DD/MM/YYYY-HH:mm')
                if (city.updated_at) {
                    const timeUpdate = moment(city.updated_at).utcOffset("-03:00").format('DD/MM/YYYY-HH:mm')
                    city.updated_at = timeUpdate
                }
                city.created_at = timeCreate
                return
            })
            this.cities = cities;
        });
    }

    saveState() {

        const data = {
            name: this.stateModel.name,
            abbreviation: this.stateModel.abbreviation,
            created_at: '',
            updated_at: '',
            user: '',
            _id: ''
        }

        this.stateService.create(data)
            .subscribe(
                (state: any) => {
                    this.loadAllStates()
                },
                err => {
                    console.log(err)
                }
            )
    }

    saveCity() {
        const data = {
            name: this.cityModel.name,
            state: this.cityModel.state,
            stateId: this.cityModel.stateId,
            created_at: '',
            updated_at: '',
            user: '',
            _id: ''
        }

        this.cityService.create(data)
            .subscribe(
                (state: any) => {
                    this.loadAllCities()
                    this.cities.push(state);
                },
                err => {
                    console.log(err)
                }
            )
    }

    updateState(id: string, data: object) {
        this.stateService.update(id, data)
            .subscribe(
                (state: any) => {
                    this.loadAllStates();
                },
                err => {
                    console.log(err)
                }
            )
    }

    updateCity(id: string, data: object) {
        this.cityService.update(id, data)
            .subscribe(
                (state: any) => {
                    this.loadAllCities();
                },
                err => {
                    console.log(err)
                }
            )
    }

}
