using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.ModelBinding;
using System.Web.Http.OData;
using System.Web.Http.OData.Routing;
using CMS.Models;

namespace CMS.OData
{
    /*
    The WebApiConfig class may require additional changes to add a route for this controller. Merge these statements into the Register method of the WebApiConfig class as applicable. Note that OData URLs are case sensitive.

    using System.Web.Http.OData.Builder;
    using System.Web.Http.OData.Extensions;
    using CMS.Models;
    ODataConventionModelBuilder builder = new ODataConventionModelBuilder();
    builder.EntitySet<Company>("CompaniesOData");
    config.Routes.MapODataServiceRoute("odata", "odata", builder.GetEdmModel());
    */
    public class CompaniesODataController : ODataController
    {
        private VBCCEntities db = new VBCCEntities();

        // GET: odata/CompaniesOData
        [EnableQuery]
        public IQueryable<Company> GetCompaniesOData()
        {
            return db.Companies;
        }

        // GET: odata/CompaniesOData(5)
        [EnableQuery]
        public SingleResult<Company> GetCompany([FromODataUri] Guid key)
        {
            return SingleResult.Create(db.Companies.Where(company => company.Id == key));
        }

        // PUT: odata/CompaniesOData(5)
        public async Task<IHttpActionResult> Put([FromODataUri] Guid key, Delta<Company> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Company company = await db.Companies.FindAsync(key);
            if (company == null)
            {
                return NotFound();
            }

            patch.Put(company);

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CompanyExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(company);
        }

        // POST: odata/CompaniesOData
        public async Task<IHttpActionResult> Post(Company company)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Companies.Add(company);

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (CompanyExists(company.Id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return Created(company);
        }

        // PATCH: odata/CompaniesOData(5)
        [AcceptVerbs("PATCH", "MERGE")]
        public async Task<IHttpActionResult> Patch([FromODataUri] Guid key, Delta<Company> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Company company = await db.Companies.FindAsync(key);
            if (company == null)
            {
                return NotFound();
            }

            patch.Patch(company);

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CompanyExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(company);
        }

        // DELETE: odata/CompaniesOData(5)
        public async Task<IHttpActionResult> Delete([FromODataUri] Guid key)
        {
            Company company = await db.Companies.FindAsync(key);
            if (company == null)
            {
                return NotFound();
            }

            db.Companies.Remove(company);
            await db.SaveChangesAsync();

            return StatusCode(HttpStatusCode.NoContent);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool CompanyExists(Guid key)
        {
            return db.Companies.Count(e => e.Id == key) > 0;
        }
    }
}
