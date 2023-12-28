<template>
    <div class="container">
        <div class="text-center my-4" id="bot">
            <h2>Bot</h2>

            <table class="table shadow-sm">
                <thead>
                    <tr>
                        <th class="p-2">    
                            <div class="row justify-content-center text-center">
                                <div class="col-md-7 themed-grid-col">
                                    <div class="row">
                                        <div class="col-md-3 themed-grid-col">Image</div>
                                        <div class="col-md-3 themed-grid-col">Name</div>
                                        <div class="col-md-3 themed-grid-col">Faction</div>
                                        <div class="col-md-3 themed-grid-col">Screen time</div>
                                    </div>
                                </div>
                                <div class="col-md-2 themed-grid-col">Alt mode</div>
                                <div class="col-md-2 themed-grid-col">Voice actor</div>
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody class="table-group-divider" id="skin-table">
                </tbody>

            </table>
        </div>

        <hr>
        <div class="text-center my-4" id="actor">
            <h2>Actor</h2>
            <div class="row row-cols-1 row-cols-sm-2 row-cols-md-10 g-3 py-4" id="actor-container">            
            </div>
        </div>
        <hr>
        <div class="text-center my-4" id="artefact">
            <h2>Artefact</h2>
        </div>
        <hr>
        <div class="text-center my-4" id="anecdote">
            <h2>Anecdote</h2>
        </div>
    </div>
</template>