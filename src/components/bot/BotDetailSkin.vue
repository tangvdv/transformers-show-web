<template>
    <div>
        <table class="table shadow-sm">
            <thead>
                <tr class="text-center">
                    <th class="col-2 themed-grid-col">Show</th>
                    <th class="col themed-grid-col">Screen time</th>
                    <th class="col themed-grid-col">Voice line</th>
                    <th class="col themed-grid-col">Transformation</th>
                    <th class="col themed-grid-col">Alt transformation</th>
                    <th class="col themed-grid-col">Robot transformation</th>
                    <th class="col themed-grid-col">Death</th>
                </tr>
            </thead>
            <tbody v-if="skins" class="table-group-divider" id="skin-table">
                <tr class="mx-2 text-center td-vertical-center table-active">
                    <td>/</td>
                    <td>{{ total_data.screen_time }}</td>
                    <td>{{ total_data.voice_line }}</td>
                    <td>{{ total_data.transformation }}</td>
                    <td>{{ total_data.alt_transformation }}</td>
                    <td>{{ total_data.robot_transformation }}</td>
                    <td>{{ total_data.death_count }}</td>
                </tr>
                <BotDetailSkinRow 
                    v-for="skin in skins"
                    :key="skin.id"
                    :show="skin.show"
                    :screen_time="skin.screen_time"
                />
            </tbody>   
        </table>
    </div>
</template>

<script>

import BotDetailSkinRow from '@/components/bot/BotDetailSkinRow.vue';

export default {
    name: "BotDetailSkin",
    components: {
        BotDetailSkinRow
    },
    props: ['skins'],
    data(){
        return{
            total_data: {
                "screen_time": 0,
                "voice_line": 0,
                "transformation": 0,
                "alt_transformation": 0,
                "robot_transformation": 0,
                "death_count": 0
            }
        }
    },
    methods: {
        calculateTotalData(){
            this.skins.forEach(skin => {
                this.total_data.screen_time += skin.screen_time
                this.total_data.voice_line += skin.voice_line
                this.total_data.transformation += skin.transformation
                this.total_data.alt_transformation += skin.alt_transformation
                this.total_data.robot_transformation += skin.robot_transformation
                this.total_data.death_count += skin.death_count
            })
        }
    },
    
    beforeMount() {
        this.calculateTotalData()
    }
}
</script>