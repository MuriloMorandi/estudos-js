import { SQLiteSelect, SQLiteSelectExecute } from 'drizzle-orm/sqlite-core';
import { count } from 'drizzle-orm';
import { LibsqlError } from "@libsql/client";
import { dbClient } from '../dbClient';


export async function fetchWithBatch<T extends SQLiteSelect>(
  queryBuilder : T,
  batchSize : number = 1000, 
): Promise<{data: SQLiteSelectExecute<T>, total: number}> {
    try {

      const [totalData] = await dbClient
        .select({
          count: count()
        })
        .from(queryBuilder.as("total"))
        .execute();
      
      let allData :SQLiteSelectExecute<T> = [];
      for (let index = 0; index < totalData.count; ) {
        const partialData = await queryBuilder
          .limit(batchSize)
          .offset(index)
          .execute();
        
        index += partialData.length;
        allData.push(...partialData);
      }

      return { data: allData, total: totalData.count };
      
    } catch (error) {
        if(error instanceof LibsqlError){
            if (error.message.includes('Response is too large'))
            {
                console.error('Response is too large');
                return { data: [], total: 0 };
            }
        }; 

        throw error;
    }
}

