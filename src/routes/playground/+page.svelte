<script >
// @ts-nocheck

	let state = false;

    let boxes = [
        {id: 23, description: "big box"},
        {id: 24, description: "small box"},
        {id: 25, description: "strange box"},
        {id: 26, description: "black box"},
        {id: 27, description: "white box"},
    ]

    /**
	 * @type {boolean[]}
	 */
    let deleteIds= []



    /**
	 * @param {{target: {checked: any;};}} event
	 * @this {{ "bind:checked": boolean; "on:click": (event: {target: {checked: any;};
	}) => void; class: string; type: "checkbox"; id: string; value: boolean; }}
	 */
    function handleClick(event){

        const id= this.value
        const checked = event.target.checked

        if (checked) {
            deleteIds.push(id)
        } else {
            deleteIds.splice(deleteIds.indexOf(id), 1)
        }
        
       
        console.log(deleteIds)
    }
</script>


<ul>
    {#each boxes as box}
        <li>
            <div class="form-check">
                <input
                    on:click={handleClick}
                    class="form-check-input"
                    type="checkbox"
                    id="hello"
                    value={box.id}
                />
                <label class="form-check-label" for="hello">{box.description}</label>
            </div>
        </li>
    {/each}
</ul>
