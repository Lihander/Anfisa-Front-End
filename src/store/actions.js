import axios from 'axios';
import * as utils from '../common/utils';

const commonHttp = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
});

export function getList(context, ws) {
    const url = ws ? `/list?ws=${ws}` : '/list';
    commonHttp.get(url)
        .then((response) => {
            const { data } = response;
            context.commit('setRecords', data.records);
            context.commit('setWorkspace', data.workspace);
            context.commit('setTotal', data.total);
            context.commit('setFiltered', data.filtered);
            context.dispatch('getZoneList', ws);
            context.dispatch('getPresets', ws);
        })
        .catch((error) => {
            console.log(error);
        });
}

export function getListByTag(context, tag) {
    const params = new URLSearchParams();
    params.append('ws', context.state.workspace);
    params.append('tag', tag);
    commonHttp.post('/tag_select', params, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    })
        .then((response) => {
            const { data } = response;
            context.commit('setRecords', data.records);
            context.commit('setTotal', data.total);
            context.commit('setFiltered', data.filtered);
        })
        .catch((error) => {
            console.log(error);
        });
}

export function getVariantDetails(context, variant) {
    const params = new URLSearchParams();
    params.append('ws', context.state.workspace);
    params.append('rec', variant);
    context.commit('setSelectedVariant', variant);
    commonHttp.post('/reccnt', params, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    })
        .then((response) => {
            const { data } = response;
            const result = {};

            const getValuesForRow = row => (Array.isArray(row) ? row.map(val => val[0]) : []);

            data.forEach((item) => {
                if (item.type === 'table') {
                    const tableData = item.rows.map(row => [row[1], ...getValuesForRow(row[2])]);
                    result[item.name] = {
                        title: item.title,
                        data: tableData,
                    };
                }
            });
            context.commit('setVariantDetails', result);
        })
        .catch((error) => {
            context.commit('setSelectedVariant', null);
            console.log(error);
        });
}

export function getVariantTags(context, variant) {
    const params = new URLSearchParams();
    params.append('ws', context.state.workspace);
    params.append('rec', variant);
    commonHttp.post('/tags', params, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    })
        .then((response) => {
            const { data } = response;
            const selectedTags = Object.keys(data['rec-tags'])
                .filter(item => data['rec-tags'][item]);
            context.commit('setAllTags', data['check-tags']);
            context.commit('setSelectedTags', selectedTags);
        })
        .catch((error) => {
            context.commit('setAllTags', []);
            context.commit('setSelectedTags', []);
            console.log(error);
        });
}

export function saveNotes(context) {
    const params = new URLSearchParams();
    params.append('ws', context.state.workspace);
    params.append('rec', context.state.selectedVariant);
    params.append('_notes', context.state.notes);
    commonHttp.post('/tags', params, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    })
        .then(() => {
            console.log('notes are saved');
        })
        .catch((error) => {
            console.log(error);
        });
}

export function toggleVariantTag(context, tag) {
    const tagsObject = {};
    context.state.selectedTags.forEach((item) => {
        tagsObject[item] = true;
    });
    if (tagsObject[tag]) {
        tagsObject[tag] = false;
    } else {
        tagsObject[tag] = true;
    }
    const params = new URLSearchParams();
    params.append('ws', context.state.workspace);
    params.append('rec', context.state.selectedVariant);
    params.append('tags', JSON.stringify(tagsObject));
    commonHttp.post('/tags', params, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    })
        .then((response) => {
            const { data } = response;
            const selectedTags = Object.keys(data['rec-tags'])
                .filter(item => data['rec-tags'][item]);
            context.commit('setAllTags', data['check-tags']);
            context.commit('setSelectedTags', selectedTags);
        })
        .catch((error) => {
            context.commit('setAllTags', []);
            context.commit('setSelectedTags', []);
            console.log(error);
        });
}

export function getWorkspaces(context) {
    commonHttp.get('/dirinfo')
        .then((response) => {
            const { data } = response;
            context.commit('setWorkspacesList', data.workspaces);
            context.commit('setVersion', data.version);
        });
}

export function getExportFile(context) {
    context.commit('setExportFileUrl', null);
    context.commit('setExportFileLoading', true);
    const params = new URLSearchParams();
    params.append('ws', context.state.workspace);
    commonHttp.post('/export', params, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    })
        .then((response) => {
            const { data } = response;
            context.commit('setExportFileLoading', false);
            context.commit('setExportFileUrl', `${process.env.VUE_APP_API_URL}/${data.fname}`);
        })
        .catch((error) => {
            console.log(error);
            context.commit('setExportFileLoading', false);
        });
}

function getZoneData(context, aZone) {
    const [zone, value] = aZone;
    const params = new URLSearchParams();
    params.append('ws', context.state.workspace);
    params.append('zone', zone);
    commonHttp.post('/zone_list', params, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    })
        .then((response) => {
            const { data } = response;
            const oZone = {
                [zone]: {
                    selectedValue: null,
                    defaultValue: value,
                    values: [null, ...data.variants],
                },
            };
            context.commit('setZone', oZone);
        });
}

export function getZoneList(context, ws) {
    const params = new URLSearchParams();
    params.append('ws', ws || context.state.workspace);
    commonHttp.post('/zone_list', params, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    })
        .then((response) => {
            const zones = response.data.filter(zone => zone[0].charAt(0) !== '_');
            zones.forEach(zone => getZoneData(context, zone));
        });
}

export function getPresets(context, ws) {
    const params = new URLSearchParams();
    params.append('ws', ws || context.state.workspace);
    params.append('conditions', context.state.currentConditions.length ? JSON.stringify(context.state.currentConditions) : null);
    commonHttp.post('/stat', params, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    })
        .then((response) => {
            const filterList = response.data['filter-list'];
            if (filterList && Array.isArray(filterList)) {
                const data = filterList.map(item => item[0]);
                context.commit('setPresets', [null, ...data]);
            }
            const statList = response.data['stat-list'];
            context.commit('setStats', utils.prepareStatList(statList));
            if (response.data.conditions) {
                context.commit('setAllCurrentConditions', response.data.conditions);
            }
        })
        .catch((error) => {
            console.log(error);
        });
}

export function getListByFilters(context) {
    const params = new URLSearchParams();
    params.append('ws', context.state.workspace);
    params.append('conditions', context.state.currentConditions.length ? JSON.stringify(context.state.currentConditions) : null);
    params.append('filter', context.state.selectedPreset);

    const { zones } = context.state;
    Object.keys(zones).forEach((currentZone) => {
        if (zones[currentZone].selectedValue !== null) {
            params.append('zone', JSON.stringify([currentZone, [zones[currentZone].selectedValue]]));
        }
    });

    return commonHttp.post('/list', params, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    }).then((response) => {
        const { data } = response;
        context.commit('setRecords', data.records);
        context.commit('setTotal', data.total);
        context.commit('setFiltered', data.filtered);
    });
}

export function getListByPreset(context, preset) {
    context.commit('setPreset', preset);
    getListByFilters(context).catch((error) => {
        console.log(error);
        context.commit('setPreset', null);
    });
}

export function getListByZone(context, { zone, value }) {
    context.commit('changeZoneValue', [zone, value]);
    getListByFilters(context).catch((error) => {
        console.log(error);
        context.commit('changeZoneValue', [zone, null]);
    });
}

export function getRulesData(context) {
    const params = new URLSearchParams();
    params.append('ws', context.state.workspace);

    commonHttp.post('/rules_data', params, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    }).then((response) => {
        const { data } = response;
        context.commit('setRulesData', data.columns);
        context.commit('setRulesParams', data.params);
    }).catch((error) => {
        console.log(error);
    });
}

export function modifyRules(context, payload) {
    const params = new URLSearchParams();
    params.append('ws', context.state.workspace);
    params.append('it', payload.name);
    params.append('cnt', payload.data);

    commonHttp.post('/rules_modify', params, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    }).then(() => {
        console.log('Rules saved');
    }).catch((error) => {
        console.log(error);
    });
}


function getFilterDetail(context, filter) {
    return new Promise((resolve, reject) => {
        const params = new URLSearchParams();
        params.append('ws', context.state.workspace);
        params.append('filter', filter);
        commonHttp.post('/stat', params, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        }).then((response) => {
            const { data } = response;
            resolve({
                name: filter,
                date: data.date,
                conditions: data.conditions,
            });
        }).catch((error) => {
            reject(error);
        });
    });
}

export function getFilterDetails(context) {
    const filters = [...context.state.presets];
    Promise.all(filters.filter(filterName => filterName)
        .map(filterName => getFilterDetail(context, filterName)))
        .then((filterDetails) => { context.commit('setFilterDetails', filterDetails); })
        .catch((error) => { console.log(error); });
}

export function removeFilter(context, filterName) {
    const params = new URLSearchParams();
    params.append('ws', context.state.workspace);
    params.append('instr', `DELETE/${filterName}`);
    commonHttp.post('/stat', params, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    }).then((response) => {
        const filterList = response.data['filter-list'];
        if (filterList && Array.isArray(filterList)) {
            const data = filterList.map(item => item[0]);
            context.commit('setPresets', [null, ...data]);
            context.commit('setPreset', null);
        }
        const statList = response.data['stat-list'];
        context.commit('setStats', utils.prepareStatList(statList));
    }).then((error) => {
        console.log(error);
    });
}

export function updateFilter(context, filterName) {
    const params = new URLSearchParams();
    params.append('ws', context.state.workspace);
    params.append('instr', `UPDATE/${filterName}`);
    params.append('conditions', JSON.stringify(context.state.currentConditions));
    commonHttp.post('/stat', params, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    }).then((response) => {
        const filterList = response.data['filter-list'];
        if (filterList && Array.isArray(filterList)) {
            const data = filterList.map(item => item[0]);
            context.commit('setPresets', [null, ...data]);
            context.commit('setPreset', null);
        }
        const statList = response.data['stat-list'];
        context.commit('setStats', utils.prepareStatList(statList));
    }).then((error) => {
        console.log(error);
    });
}

export function getConditionsByFilter(context, filter) {
    const params = new URLSearchParams();
    params.append('ws', context.state.workspace);
    params.append('filter', filter);
    commonHttp.post('/stat', params, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    }).then((response) => {
        const { data } = response;
        context.commit('setAllCurrentConditions', data.conditions || []);
    }).catch((error) => {
        console.log(error);
    });
}
