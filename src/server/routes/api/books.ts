import {Router} from 'express';
import * as passport from 'passport';
import db from '../../db';

const router = Router();

//GET all
router.get('/', async (req, res) => {
    try{
        const books = await db.books.all();
        res.json(books);
    }catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "get all path broken at api books.ts",
            error,
        });
    };
});

//GET one
router.get('/:id?', async (req, res) => {
    try{
        const id = Number(req.params.id);
        const [books] = await db.books.one(id);
        res.json(books);
    }catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "get one path broken at api books.ts",
            error,
        });
    };
});

// POST 
router.post('/', passport.authenticate("jwt"), async (req: any, res) => {
    try{
        const newBook = req.body;

        const results = await db.books.insert(newBook); // a whole book    
        res.json(results);

    }catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "get post path broken at api books.ts",
            error,
        });
    };
});

router.put('/:id', passport.authenticate("jwt"), async (req: any, res) => {
        const id = Number(req.params.id);
        const editedBlog = req.body;

        const results = await db.books.update(
            editedBlog,
            id
        ); // parts of a book that can be edited 
        res.json(results);

});


// DELETE
router.delete('/:id', passport.authenticate("jwt"), async (req: any, res) => {
    try{
        const id = Number(req.params.id);
        const results = await db.books.destroy(id); 
        res.json(results);

    }catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "get delete path broken at api books.ts",
            error,
        });
    };
});

export default router;