const z = require("zod");

const IdSchema = z.object({
    id: z.string(),
})

module.exports = {
    IdSchema,
}