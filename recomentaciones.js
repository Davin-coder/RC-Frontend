// //esto lo pongo pq lo recfomendo gpt pal backend
// // src/controllers/users/getUserRolesController.js
// export async function getUserRolesController(req, res) {
//   const id = Number(req.params.id);
//   if (!Number.isInteger(id)) return res.status(400).json({ ok: false, msg: "Invalid user id" });

//   const q = `
//     SELECT r.id_role, r.role_name AS name, ur.id_tl_area
//     FROM user_roles ur
//     JOIN roles r ON r.id_role = ur.id_role
//     WHERE ur.id_user = $1
//     ORDER BY r.role_name
//   `;
//   try {
//     const { rows } = await req.pool.query(q, [id]);
//     return res.json({ ok: true, roles: rows });
//   } catch (e) {
//     console.error(e);
//     return res.status(500).json({ ok: false, msg: "DB error" });
//   }
// }

// // src/controllers/users/getUserSkillsController.js
// export async function getUserSkillsController(req, res) {
//   const id = Number(req.params.id);
//   if (!Number.isInteger(id)) return res.status(400).json({ ok: false, msg: "Invalid user id" });

//   const q = `
//     SELECT s.id_skill, s.skill_name AS name, us.user_level
//     FROM user_skills us
//     JOIN skills s ON s.id_skill = us.id_skill
//     WHERE us.id_user = $1
//     ORDER BY s.skill_name
//   `;
//   try {
//     const { rows } = await req.pool.query(q, [id]);
//     return res.json({ ok: true, skills: rows });
//   } catch (e) {
//     console.error(e);
//     return res.status(500).json({ ok: false, msg: "DB error" });
//   }
// }

// // src/controllers/users/getOneUserController.js (solo ejemplo de validación)
// export async function getOneUserController(req, res) {
//   const id = Number(req.params.id);
//   if (!Number.isInteger(id)) return res.status(400).json({ ok: false, msg: "Invalid user id" });

//   const q = `
//     SELECT id_user, email, first_name, last_name, role
//     FROM users
//     WHERE id_user = $1
//     LIMIT 1
//   `;
//   try {
//     const { rows } = await req.pool.query(q, [id]);
//     if (!rows.length) return res.status(404).json({ ok: false, msg: "User not found" });
//     return res.json({ ok: true, user: rows[0] });
//   } catch (e) {
//     console.error(e);
//     return res.status(500).json({ ok: false, msg: "DB error" });
//   }
// }

// // src/routes/usersRoutes.js
// import { getOneUserController } from "../controllers/users/getOneUserController.js";
// import { getUserRolesController } from "../controllers/users/getUserRolesController.js";
// import { getUserSkillsController } from "../controllers/users/getUserSkillsController.js";

// const router = Router();

// // 🔒 Rutas específicas primero
// router.get("/:id/roles", getUserRolesController);
// router.get("/:id/skills", getUserSkillsController);

// // (si tienes /users/roles o /users/skills sin :id, colócalas arriba de /:id también)
// // router.get("/roles", ...);
// // router.get("/skills", ...);

// // 👇 Al final
// router.get("/:id", getOneUserController);

// export default router;
