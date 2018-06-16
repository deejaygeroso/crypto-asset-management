
module.exports = function(app, router, itemName, ItemModel){
    return {
        /* ----------------------------------------------------------
         * Find item by selected fields.
         * -------------------------------------------------------- */
        find: () => {
            router.post(`/${itemName}/find`, (req, res)=>{
                const item = req.body;

                // if item object is empty return an error
                if(Object.keys(item).length===0 || !item._id || item._id===''){
                    return res.send({message: 'No portfolio id was passed as a parameter!'});
                }

                ItemModel.findOne(item, (err, docs) => {
                    if(err) return res.status(400).send({message: err});
                    res.send(docs)
                });
            })
        },
        /* ----------------------------------------------------------
         * Find all.
         * -------------------------------------------------------- */
        findAll : () => {
           router.post(`/${itemName}/find/all`, (req, res)=>{
               ItemModel.find({}, (err, docs) => {
                   if(err) return res.status(400).send({message: err});
                   res.send(docs)
                });
            })
        },
        /* ----------------------------------------------------------
         * Find by fields and have ability to sort, select & etc.
         * -------------------------------------------------------- */
        findByQuery: () => {
            router.post(`/${itemName}/find/query`, (req, res)=>{
                const query = req.body;
                ItemModel.find(query, (err, docs) => {
                    if(err) return res.status(400).send({message: err});
                    res.send(docs)
                });
            }) 
        },
        /* ----------------------------------------------------------
         * Find list of item by user id.
         * -------------------------------------------------------- */
        findAllUserId: () => {
            router.post(`/${itemName}/find/all/user_id`, (req, res)=>{
                const { user_id } = req.body;
                ItemModel.find({user_id: new ObjectId(user_id)}, (err, docs) => {
                    if(err) return res.status(400).send({message: err});
                    res.send(docs)
                });
            }) 
        },
        /* ----------------------------------------------------------
         * Create new item.
         * -------------------------------------------------------- */
        create: () => {
            router.post(`/${itemName}/create`, (req, res)=>{
                const itemData = req.body;

                // create a new link
                const link = new ItemModel(itemData);

                // save user to database
                link.save(function(err, item) {
                    if(err) return res.status(400).send({message: err}); // if saving failed
                    res.send(item)
                });
            })
        },
        /* ----------------------------------------------------------
         * Create new list of items.
         * -------------------------------------------------------- */
        createBulk: () => {
            router.post(`/${itemName}/create/bulk`, (req, res)=>{
                const itemBulkData = req.body;

                ItemModel.collection.insert(itemBulkData, (err, docs) => {
                    if(err) return res.status(400).send({message: err}); // if saving failed
                    res.send(docs)
                  });
            })
        },
        /* ----------------------------------------------------------
         * Update an item by _id.
         * -------------------------------------------------------- */
        update: () => {
            router.post(`/${itemName}/update`, (req, res)=>{
                const { _id } = req.body;
                const itemData = req.body;

                ItemModel.findById(_id, function(err, doc) {
                    if(err) return res.status(400).send({message: err});

                    // assign all the data to be saved/updated
                    const itemDataKeys = Object.keys(itemData);
                    itemDataKeys.map(data=>{
                        doc[data] = itemData[data];
                    })

                    doc.save();
                    res.send(doc)
                });
            })
        },
        /* ----------------------------------------------------------------------------------
         * Link remove an item by _id.
         * -------------------------------------------------------------------------------- */
        remove: () => {
            router.post(`/${itemName}/remove`, (req, res)=>{
                const { _id } = req.body;
                ItemModel.remove({ _id }, function (err) {
                    if(err) return res.status(400).send({message: err});
                    res.send({message: 'Removing of data was successful!'})
                });
            })
        }
    }

}