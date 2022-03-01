const schema={
	type: "object",
	properties: {
		grid: {
			type: "array",
			id: "grid",
			minItems: 5,
			maxItems: 20,
			items: {
				type: "object",
				id: "item-grid",
				properties: {
					id: {
						$ref: "#/definitions/positiveInt"
					},
					codigo: {
						type: "string"
					},
					nombre: {
						type: "string"
					}
				},
				additionalProperties: false,
				required: ["id","codigo","nombre"]
			}
		},
		menu: {
			type: "array",
			id: "menu",
			minItems: 5,
			items: {
				type: "object",
				properties: {
					id: {
						$ref: "#/definitions/positiveInt"
					},
					tipo: {
						type: "string",
						enum: ["grid","pagina"]
					},
					nombre: {
						type: "string"
					},
					grid: {
						oneOf: [{jsonPath: "$..grid[*].id"}]
					},
					submenu: {
						type: "array",
						id: "submenu",
						minItems: 1,
						maxItems: 3,
						items: {
							type: "object",
							
							properties: {
								id: {
									$ref: "#/definitions/positiveInt"
								},
								nombre: {
									type: "string"
								},
								grid: {
									oneOf: [{jsonPath: "$..grid[*].id"}]
								},
								tipo: {
									type: "string",
									enum: ["grid","pagina"]
								}
							},
							additionalProperties: false,
							required: ["id","nombre"]
						}
						
					}
				},
				additionalProperties: false,
				required: ["id","tipo","nombre"]
			}
		}
	},
	required: ["grid","menu"],
	definitions: {
		positiveInt: {
			type: "integer",
			minimum: 1,
			unique: true
		}
	}
};

module.exports=schema;
